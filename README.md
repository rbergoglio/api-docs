# API Docs – CORE (Swagger + RabbitMQ/AsyncAPI)

Este repo contiene **dos tipos de documentación**:

1. **REST (Swagger/OpenAPI)** → `index.html` + `openapi.yaml`  
2. **Eventos (RabbitMQ / AsyncAPI)** → `asyncapi.yaml` + sitio generado en `site/`

> Objetivo: tener docs estáticas que se puedan abrir localmente y publicar en GitHub Pages, sin back, para la primera entrega.


---

## ✅ Requisitos
- **Node.js** y **npm**
- (Opcional) **@asyncapi/cli** para generar la doc de eventos

Instalación del CLI de AsyncAPI (global):
```bash
npm i -g @asyncapi/cli
```

---

## 1) 🚀 Correr la doc **Swagger/OpenAPI** localmente
> Se usa **Swagger UI** cargado desde CDN dentro de `index.html` (no dependemos de `node_modules` para GitHub Pages).

### a) Servir archivos estáticos
Desde la carpeta donde están `index.html` y `openapi.yaml`:

```bash
# Opción 1
npx http-server -p 5173 .

# Opción 2
npx serve -l 5173 .
```

Abrí en el navegador: `http://localhost:5173`

### b) Estructura mínima de `index.html`
Asegurate de usar **CDN** y una **ruta relativa** a tu YAML:
```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>API Académica</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.17.14/swagger-ui.css">
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5.17.14/swagger-ui-bundle.js"></script>
    <script>
      window.ui = SwaggerUIBundle({
        url: "./openapi.yaml",   // mismo folder que index.html
        dom_id: "#swagger-ui"
      });
    </script>
  </body>
</html>
```
---

## 2) 📣 Documentación de **eventos** (RabbitMQ) con **AsyncAPI**
- El contrato de eventos está en `asyncapi.yaml`.
- Generamos un sitio estático en `./site` usando el **template HTML** oficial.

### a) Validar
```bash
asyncapi validate ./asyncapi.yaml
```

### b) Generar el sitio HTML
Algunas versiones del template requieren el **Generador v2**. Si ves un error de compatibilidad, agregá `--use-new-generator`:

```bash
asyncapi generate fromTemplate ./asyncapi.yaml @asyncapi/html-template@3.0.0 --use-new-generator -o ./site --force-write -p singleFile=true sidebarOrganization=byTagsNoRoot
```

### c) Visualizar
Abrí `./site/index.html` en el navegador (o serví la carpeta con `http-server`/`serve`).

---

## 🧪 Validaciones rápidas
- **OpenAPI:** pegá `openapi.yaml` en Swagger Editor (web) y revisá que no haya errores.
- **AsyncAPI:** `asyncapi validate ./asyncapi.yaml`

---

## 📦 Qué estamos usando
- **Swagger UI (viewer)** para la renderización de `openapi.yaml` (REST).  
- **OpenAPI 3.0.x** como contrato REST.  
- **AsyncAPI 2.6.x** como contrato de eventos (RabbitMQ/AMQP, exchange `core.events` tipo `topic`).  
- **@asyncapi/html-template** para generar el sitio estático de eventos.
