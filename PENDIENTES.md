# Web corporativa RB Dental — pendientes

Actualizado: 17 sep 2026. Web en `corporativa/`, publicada en tarifas.laboratoriodentalrb.com/corporativa/

## Ahora
1. **Revisar la version de ordenador** (Yael, manana). Todo lo de hoy se hizo mirando el movil.
2. **Resenas de Google.** Falta el enlace a la ficha de Google Business del *laboratorio* (la 4,9 con 102 resenas es la de las clinicas, de pacientes). Con el enlace: primero 3-4 resenas reales copiadas; despues en vivo con clave de Google Places.
3. **Captacion de contactos (WhatsApp + email) para enviar la tarifa.**
   - Hoy: los botones de "Tarifas" abren WhatsApp con "Hola, quiero recibir las tarifas 2026 del laboratorio" ya escrito. Lo contesta una persona. Mientras no haya bot: mensaje de bienvenida automatico en WhatsApp Business.
   - Bot de WhatsApp con IA: hace falta cuenta Wassenger (~15 EUR/mes) en el 680 555 303, una clave de IA y el visto bueno al guion (bienvenida, pedir nombre + clinica, enviar tarifa, dudas, ofrecer llamada de Simon).
   - Email: HECHO (17 sep) pagina `tarifas.html` con boton de WhatsApp + formulario. El envio lo hace `api/tarifa.js` (Vercel) por Brevo: falta poner en Vercel `BREVO_API_KEY` (y opcional `BREVO_LIST_ID`, `TARIFA_TO`). Mientras no este la clave, el formulario ofrece pedirla por WhatsApp con los datos ya escritos.
   - CRM: version simplificada. Una sola lista de contactos (nombre, clinica, telefono, email, origen, fecha, estado: nuevo / tarifa enviada / llamar / cliente) que rellenan el bot y el formulario, con resumen diario por WhatsApp. El CRM completo (lab-crm-rb) queda como base para mas adelante.
4. **Aviso legal:** falta razon social exacta, CIF y datos registrales. Revisar los tres textos legales con la gestoria.

## Fotos que faltan
- Ferula **mixta** sobre blanco (la actual es del banco gris, se ve como una franja).
- **Carilla terminada** (la de ahora es la lila sin cristalizar) y un **encerado / llave de silicona** para Diseno de sonrisa 02.
- Foto real de **Simon** para Quienes somos (solo hay imagenes generadas por IA en el Drive).
- Fotos del zip sin usar (12): darian para tarjetas nuevas (perno munon, puente cementado, unitaria, implantes periosticos, barras Ackerman/locator, refuerzo locator...). Decidir cuales.

## Decisiones abiertas
- "+4.000 trabajos al ano": confirmar la cifra o cambiarla.
- Placa azul o verde en la portada de Ortodoncia.
- Etiquetas fijas del carrusel de la home ("CAD 0.02 mm", "ZIRCONIO A2"): pasar a una por foto o quitarlas.
- Recogida gratuita en Madrid ya no aparece en la portada de la home (esta en pie, plazos y donde estamos).

## Mas adelante
- ~~Ofertas del mes~~: HECHO (17 sep). Pagina `ofertas.html`, bloque en la portada y pop-up (sale una vez por mes y visitante). Para cambiar mes, textos o desactivarlo: `corporativa/js/ofertas.js`.
- Pasar la web al dominio principal (Vercel root = `corporativa`, DNS en Wix). La web antigua laboratoriodentalrb.com sigue en linea con /precios publico.
- Tarifa publica: si solo debe llegar por WhatsApp, proteger tarifas.laboratoriodentalrb.com.
- Google Fonts en servidor propio (privacidad).
- Boton de consentimiento del mapa: hecho y retirado a peticion; se repone si hace falta.
