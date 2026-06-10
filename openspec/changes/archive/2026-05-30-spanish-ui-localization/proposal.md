## Why

Los usuarios de este dashboard son hispanohablantes y la organización se llama **Gaiarec**. La interfaz actual muestra el nombre genérico "EcoCollect" y los menús en inglés, lo que genera una experiencia desconectada de la identidad real del cliente.

## What Changes

- Reemplazar el nombre "EcoCollect" por **Gaiarec** en el encabezado de la barra lateral
- Reemplazar el subtítulo "Recyclers Association" por el equivalente en español
- Traducir los ítems de navegación al español:
  - "Dashboard" → "Panel"
  - "Recyclers" → "Recicladores"
  - "Producers" → "Productores"
- Traducir encabezados y etiquetas de las vistas principales al español

## Capabilities

### New Capabilities

_(ninguna capacidad nueva; solo ajustes de contenido y texto)_

### Modified Capabilities

- `app-shell`: Cambia los requisitos de texto del encabezado (nombre de la organización) y las etiquetas de navegación para reflejar el idioma español y la marca Gaiarec.

## Impact

- `src/components/Sidebar.tsx` — nombre de org, subtítulo y etiquetas de nav
- `src/pages/` — encabezados y etiquetas visibles en cada vista (Dashboard, Recyclers, Producers)
- `openspec/specs/app-shell/spec.md` — actualización de requisitos de texto del shell
