// Formulario "Pideme la tarifa" de la web corporativa.
// Envia un aviso por email al laboratorio y guarda el contacto en Brevo (si hay lista).
// Variables en Vercel:  BREVO_API_KEY  TARIFA_TO (email destino, por defecto laboratorio@rbdental.es)
//                       BREVO_LIST_ID (opcional, lista de Brevo donde guardar el contacto)
//                       CRM_ENTRADA_URL (https://leads.laboratoriodentalrb.com/api/entrada) + CRM_ENTRADA_SECRET: crea la clinica en el CRM
// Basta con que funcione uno de los dos (Brevo o CRM) para dar el formulario por enviado.
const TO = process.env.TARIFA_TO || 'laboratorio@rbdental.es';
const FROM = process.env.TARIFA_FROM || 'web@laboratoriodentalrb.com';

function clean(v, max) { return String(v || '').replace(/[\r\n\t]+/g, ' ').trim().slice(0, max); }
function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.statusCode = 405; return res.json({ ok: false, error: 'method' }); }
  let b = req.body;
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch (e) { b = {}; } }
  b = b || {};
  if (b.web) { return res.json({ ok: true }); } // honeypot: bots rellenan el campo oculto
  const nombre = clean(b.nombre, 80), clinica = clean(b.clinica, 120), email = clean(b.email, 120), tel = clean(b.tel, 40), msg = clean(b.mensaje, 600);
  if (!nombre || !email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !b.consent) { res.statusCode = 400; return res.json({ ok: false, error: 'datos' }); }
  const key = process.env.BREVO_API_KEY;
  // 1) CRM: crear la clinica (si esta configurado)
  let crmOk = false;
  if (process.env.CRM_ENTRADA_URL) {
    try {
      const rc = await fetch(process.env.CRM_ENTRADA_URL, { method: 'POST', headers: { 'content-type': 'application/json', 'x-entrada-secret': process.env.CRM_ENTRADA_SECRET || '' },
        body: JSON.stringify({ nombre, clinica, email, tel, mensaje: msg, origen: 'web' }) });
      crmOk = rc.ok; if (!rc.ok) console.error('crm entrada', rc.status, await rc.text());
    } catch (e) { console.error('crm entrada', e); }
  }
  if (!key) { if (crmOk) return res.json({ ok: true, crm: true }); res.statusCode = 503; return res.json({ ok: false, error: 'sin-configurar' }); }
  const fecha = new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' });
  const rows = [['Nombre', nombre], ['Clinica', clinica || '-'], ['Email', email], ['Telefono', tel || '-'], ['Mensaje', msg || '-'], ['Fecha', fecha]];
  const html = '<h2 style="font-family:Arial">Nueva solicitud de tarifa 2026</h2><table style="font-family:Arial;font-size:14px;border-collapse:collapse">' +
    rows.map(r => `<tr><td style="padding:6px 12px 6px 0;color:#666">${r[0]}</td><td style="padding:6px 0"><b>${esc(r[1])}</b></td></tr>`).join('') +
    '</table><p style="font-family:Arial;font-size:13px;color:#666">Ha aceptado la politica de privacidad y el envio de la tarifa y comunicaciones del laboratorio.</p>';
  const H = { 'api-key': key, 'content-type': 'application/json', accept: 'application/json' };
  const r = await fetch('https://api.brevo.com/v3/smtp/email', { method: 'POST', headers: H, body: JSON.stringify({
    sender: { name: 'Web RB Dental', email: FROM }, to: [{ email: TO }], replyTo: { email, name: nombre },
    subject: `Tarifa 2026 solicitada: ${nombre}${clinica ? ' - ' + clinica : ''}`, htmlContent: html }) });
  if (!r.ok) { const t = await r.text(); console.error('brevo email', r.status, t); if (crmOk) return res.json({ ok: true, crm: true }); res.statusCode = 502; return res.json({ ok: false, error: 'envio' }); }
  const list = parseInt(process.env.BREVO_LIST_ID || '', 10);
  try {
    await fetch('https://api.brevo.com/v3/contacts', { method: 'POST', headers: H, body: JSON.stringify({
      email, updateEnabled: true, attributes: { NOMBRE: nombre, CLINICA: clinica, SMS: tel ? tel.replace(/\s+/g, '') : undefined, ORIGEN: 'web-tarifas' },
      listIds: list ? [list] : undefined }) });
  } catch (e) { console.error('brevo contact', e); }
  return res.json({ ok: true });
};
