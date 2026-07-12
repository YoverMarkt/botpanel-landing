/* BotPanel — lógica de la landing (sin dependencias)
   ------------------------------------------------------------------
   Reemplaza el runtime original. Hace tres cosas:
     1) Arma el enlace de WhatsApp a partir de la configuración.
     2) Aplica los estados :hover que antes venían del editor.
     3) Controla el acordeón de "Preguntas frecuentes".
   ================================================================== */

/* ====== CONFIGURACIÓN — edita estos dos valores ====== */
var CONFIG = {
  // Número de WhatsApp con código de país, solo dígitos (sin +, espacios ni guiones).
  numeroWhatsApp: "593999999999",
  // Mensaje que aparece prellenado al abrir el chat.
  mensajePrellenado: "Hola, quiero una demo gratis de BotPanel para mi negocio"
};
/* ===================================================== */

document.addEventListener("DOMContentLoaded", function () {
  // 1) Enlaces de WhatsApp
  var number = String(CONFIG.numeroWhatsApp).replace(/[^0-9]/g, "");
  var waLink = "https://wa.me/" + number + "?text=" + encodeURIComponent(CONFIG.mensajePrellenado);
  document.querySelectorAll("[data-wa-link]").forEach(function (a) {
    a.setAttribute("href", waLink);
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener");
  });

  // 2) Estados hover (antes atributo style-hover del editor)
  document.querySelectorAll("[data-hover]").forEach(function (el) {
    var hoverDecls = el.getAttribute("data-hover"); // ej: "background: #3BE07A"
    // Guardamos los valores base para poder restaurarlos al salir.
    var props = parseDecls(hoverDecls);
    var original = {};
    Object.keys(props).forEach(function (prop) {
      original[prop] = el.style.getPropertyValue(prop);
    });
    el.addEventListener("mouseenter", function () {
      Object.keys(props).forEach(function (prop) {
        el.style.setProperty(prop, props[prop]);
      });
    });
    el.addEventListener("mouseleave", function () {
      Object.keys(props).forEach(function (prop) {
        if (original[prop]) el.style.setProperty(prop, original[prop]);
        else el.style.removeProperty(prop);
      });
    });
  });

  // 3) Acordeón de FAQs (solo una abierta a la vez)
  var items = Array.prototype.slice.call(document.querySelectorAll(".faq-item"));
  items.forEach(function (item) {
    var btn = item.querySelector(".faq-q");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var isOpen = item.getAttribute("data-open") === "true";
      // Cierra todas
      items.forEach(function (it) { setFaqOpen(it, false); });
      // Abre la clicada solo si estaba cerrada (toggle)
      if (!isOpen) setFaqOpen(item, true);
    });
  });
});

function setFaqOpen(item, open) {
  item.setAttribute("data-open", open ? "true" : "false");
  var answer = item.querySelector(".faq-a");
  var icon = item.querySelector(".faq-icon");
  if (answer) answer.style.display = open ? "" : "none";
  if (icon) icon.textContent = open ? "−" : "+";
}

/* Convierte "background: #fff; color: red" -> { background:"#fff", color:"red" } */
function parseDecls(str) {
  var out = {};
  (str || "").split(";").forEach(function (chunk) {
    var idx = chunk.indexOf(":");
    if (idx === -1) return;
    var prop = chunk.slice(0, idx).trim();
    var val = chunk.slice(idx + 1).trim();
    if (prop) out[prop] = val;
  });
  return out;
}
