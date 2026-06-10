## Why

La aplicación usa datos simulados dispersos en múltiples archivos TypeScript donde valores como las categorías de materiales se repiten en cada conjunto de datos sin una fuente única de verdad. Además, hay varias inconsistencias de UI descubiertas tras la localización al español y se quiere enriquecer el perfil de reciclador con visualización de la última ruta recorrida en un mapa.

## What Changes

- En `/dashboard`: revertir el ítem de navegación "Panel" → "Dashboard" (término suficientemente conocido en español)
- En `/dashboard`: eliminar las etiquetas de texto junto a cada sector del gráfico de torta (son redundantes y dificultan la lectura)
- En `/recyclers`: mostrar los nombres de categoría de materiales en español (actualmente aparecen en inglés)
- **BREAKING** Reemplazar los módulos de datos simulados (`src/data/*.ts`) por una capa de base de datos SQLite local (via `sql.js` o `better-sqlite3`) con tablas que centralicen entidades como categorías, recicladores y productores; los datos actuales se migran como seed inicial
- En el perfil de cada reciclador: agregar debajo de "Recolecciones mensuales" un mapa OpenStreetMap (via Leaflet) que muestre la última ruta registrada — puntos numerados conectados por una línea en el orden en que se visitaron las ubicaciones

## Capabilities

### New Capabilities
- `data-layer`: Capa de base de datos SQLite embebida que centraliza categorías, recicladores, productores y rutas; reemplaza los archivos `src/data/*.ts` con un módulo `src/db/` que expone funciones de consulta sincrónicas
- `recycler-route-map`: Mapa interactivo en el perfil del reciclador (bajo "Recolecciones mensuales") que muestra la última ruta registrada con puntos numerados y línea de recorrido usando Leaflet + OpenStreetMap

### Modified Capabilities
- `app-shell`: Cambiar etiqueta de navegación "Panel" → "Dashboard"
- `overview-dashboard`: Eliminar etiquetas de texto en los sectores del gráfico de torta
- `recycler-profiles`: Sustituir datos de categorías en inglés por los términos en español; agregar componente de mapa de ruta

## Impact

- `src/data/` — módulos eliminados y reemplazados por `src/db/`
- `src/db/` — nuevo directorio con esquema, seed y helpers de consulta
- `src/components/Sidebar.tsx` — etiqueta de nav "Dashboard"
- `src/pages/Dashboard/` — ajuste del gráfico de torta (sin etiquetas externas)
- `src/pages/Recyclers/` — categorías en español; nuevo componente `RouteMap`
- `openspec/specs/app-shell/spec.md` — actualización de requisito de etiqueta nav
- `openspec/specs/overview-dashboard/spec.md` — requisito de etiquetas del gráfico
- `openspec/specs/recycler-profiles/spec.md` — categorías en español + mapa de ruta
- **Nueva dependencia**: `leaflet` + `react-leaflet` para el mapa; `sql.js` para SQLite en el navegador
