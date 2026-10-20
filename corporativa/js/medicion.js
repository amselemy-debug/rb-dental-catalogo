/* Estadisticas de la web (Google Analytics) - RB Dental
   - Google Analytics SOLO se carga si la visita pulsa "Aceptar" en el aviso de cookies.
   - Cuenta como "contacto": WhatsApp, llamada, email y formulario de tarifas. */
(function () {
  var GA = 'G-8CV0SD0R3E', KEY = 'rb_cookies';
  var eleccion = null; try { eleccion = localStorage.getItem(KEY); } catch (e) {}
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  var cargado = false;
  function cargar() {
    if (cargado) return; cargado = true;
    var s = document.createElement('script'); s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA; document.head.appendChild(s);
    gtag('js', new Date()); gtag('config', GA, { anonymize_ip: true });
  }
  window.rbEvento = function (nombre, datos) { if (cargado) gtag('event', nombre, datos || {}); };

  // Clics en contactos
  document.addEventListener('click', function (ev) {
    var a = ev.target.closest && ev.target.closest('a[href]'); if (!a) return;
    var h = a.getAttribute('href') || '', donde = location.pathname;
    if (h.indexOf('wa.me/') > -1) rbEvento('contacto_whatsapp', { pagina: donde, texto: (a.textContent || '').trim().slice(0, 60) });
    else if (h.indexOf('tel:') === 0) rbEvento('contacto_llamada', { pagina: donde });
    else if (h.indexOf('mailto:') === 0) rbEvento('contacto_email', { pagina: donde });
    else if (/\.pdf($|\?)/i.test(h)) rbEvento('descarga_pdf', { pagina: donde, archivo: h.split('/').pop() });
  }, true);

  // Aviso de cookies
  function guardar(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function aviso() {
    var css = document.createElement('style');
    css.textContent = '.rbck{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:760px;margin:0 auto;background:#0d1b4b;color:#e6e9f3;border:1px solid rgba(227,199,110,.55);border-radius:16px;box-shadow:0 18px 50px rgba(0,0,0,.35);padding:16px 18px;display:flex;gap:16px;align-items:center;font:14px/1.5 "Nunito Sans",system-ui,sans-serif}' +
      '.rbck p{margin:0;flex:1}.rbck a{color:#e3c76e}.rbck .b{display:flex;gap:8px;flex-shrink:0}' +
      '.rbck button{font:700 13px "Montserrat",system-ui,sans-serif;border-radius:999px;padding:9px 16px;cursor:pointer;border:1px solid #e3c76e}' +
      '.rbck .si{background:linear-gradient(120deg,#c9a24b,#e3c76e);color:#0d1b4b}.rbck .no{background:transparent;color:#fff}' +
      '@media(max-width:600px){.rbck{flex-direction:column;align-items:stretch;left:10px;right:10px;bottom:10px}.rbck .b{justify-content:flex-end}}';
    document.head.appendChild(css);
    var d = document.createElement('div'); d.className = 'rbck'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-label', 'Aviso de cookies');
    d.innerHTML = '<p>Usamos cookies de anal&iacute;tica para saber cu&aacute;ntas personas visitan la web y mejorarla. Solo se activan si aceptas. <a href="/corporativa/cookies.html">M&aacute;s informaci&oacute;n</a></p><div class="b"><button type="button" class="no">Rechazar</button><button type="button" class="si">Aceptar</button></div>';
    document.body.appendChild(d);
    d.querySelector('.si').addEventListener('click', function () { guardar('si'); d.remove(); cargar(); });
    d.querySelector('.no').addEventListener('click', function () { guardar('no'); d.remove(); });
  }
  window.rbCambiarCookies = function () { try { localStorage.removeItem(KEY); } catch (e) {} location.reload(); };

  if (eleccion === 'si') cargar();
  else if (eleccion !== 'no') { if (document.body) aviso(); else document.addEventListener('DOMContentLoaded', aviso); }
})();
