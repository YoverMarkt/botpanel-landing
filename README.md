# BotPanel — Landing

Landing page estática de BotPanel, lista para publicar en **GitHub Pages**. No usa React ni ningún runtime: es HTML, CSS y JavaScript puro.

## Archivos

| Archivo | Qué contiene |
|---|---|
| `index.html` | Estructura y contenido de la página. |
| `styles.css` | Estilos globales, reset y animaciones. |
| `script.js` | Enlace de WhatsApp, estados hover y acordeón de FAQs. |

> El archivo `BotPanel Landing (standalone).html` es el original empaquetado (React + runtime). Ya no se usa; puedes borrarlo o conservarlo como respaldo.

## Configurar el número de WhatsApp

Edita las dos primeras variables en [`script.js`](script.js):

```js
var CONFIG = {
  numeroWhatsApp: "593999999999", // tu número con código de país, solo dígitos
  mensajePrellenado: "Hola, quiero una demo gratis de BotPanel para mi negocio"
};
```

Todos los botones de la página abrirán `https://wa.me/<numero>?text=<mensaje>`.

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub y sube estos archivos (deja `index.html` en la raíz):
   ```bash
   git init
   git add index.html styles.css script.js README.md
   git commit -m "Landing de BotPanel"
   git branch -M main
   git remote add origin https://github.com/<usuario>/<repo>.git
   git push -u origin main
   ```
2. En GitHub: **Settings → Pages**.
3. En *Build and deployment*, elige **Deploy from a branch**, rama `main`, carpeta `/ (root)` y guarda.
4. En 1–2 minutos tu sitio estará en `https://<usuario>.github.io/<repo>/`.

## Ver en local

Abre `index.html` en el navegador, o sirve la carpeta:

```bash
python3 -m http.server 8000
# luego abre http://localhost:8000
```

Las fuentes (Manrope y Sora) se cargan desde Google Fonts, así que necesitas conexión a internet para verlas correctamente.
