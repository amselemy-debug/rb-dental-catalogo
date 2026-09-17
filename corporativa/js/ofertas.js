/* Ofertas del mes — RB Dental
   Este es el UNICO sitio que hay que tocar para cambiar el pop-up y el bloque de la portada.
   - activo: true/false  (false = no sale el pop-up ni el bloque de la portada)
   - mes: texto que se muestra ("Septiembre 2026")
   - ofertas: dos ofertas (titulo corto, detalle, texto del boton de WhatsApp) */
window.OFERTAS_RB = {
  activo: true,
  mes: "Septiembre 2026",
  ofertas: [
    { kicker: "Clínicas nuevas", titulo: "20% dto. tu primer mes", detalle: "Sobre la tarifa 2026, en prótesis fija y removible. Sin permanencia ni pedido mínimo.", wa: "Hola, quiero el bono de bienvenida del 20% del laboratorio" },
    { kicker: "Regalo de bienvenida", titulo: "1ª corona gratis", detalle: "Tu primera corona cementada, de cerámica o de zirconio, para que compruebes nuestro ajuste sin compromiso.", wa: "Hola, quiero mi primera corona gratis del laboratorio" }
  ]
};
