## Context

La aplicación actualmente funciona con datos simulados almacenados en tres módulos TypeScript (`src/data/recyclers.ts`, `src/data/producers.ts`, `src/data/metrics.ts`). Los valores compartidos —como los nombres de categorías de materiales— se repiten en cada módulo sin una fuente única de verdad, lo que provoca inconsistencias (p. ej., categorías en inglés en la vista de recicladores). Además se detectaron varias fricciones de UI tras la localización y se quiere agregar un mapa interactivo de la última ruta recorrida por cada reciclador.

## Goals / Non-Goals

**Goals:**
- Centralizar todos los datos de la app en una capa SQLite embebida (`sql.js`) que corra en el navegador sin backend
- Eliminar redundancias: categorías de materiales definidas una sola vez en la base de datos
- Corregir inconsistencias de UI: etiqueta de nav "Dashboard", sin labels externos en la torta, categorías en español en perfiles de recicladores
- Agregar visualización de ruta con Leaflet + OpenStreetMap en el perfil de cada reciclador

**Non-Goals:**
- No se implementa autenticación ni persistencia remota
- No se expone ningún API REST; todo sigue siendo client-side
- No se migran datos reales; el seed sigue siendo demo data

## Decisions

### D1: SQLite en el navegador via `sql.js`
**Decisión**: usar `sql.js` (compilación WebAssembly de SQLite) cargada al inicio de la app; la DB se inicializa en memoria y se puebla con el seed en cada arranque.  
**Alternativas consideradas**:
- `IndexedDB` directamente: API asíncrona y sin SQL nativo, más compleja de consultar
- `better-sqlite3`: requiere Node.js; no corre en el navegador
- `localStorage` con JSON: no escala y no tiene relaciones  
**Rationale**: `sql.js` ofrece SQL real, corre 100% en el navegador, y facilita la futura migración a un backend real (mismo esquema SQL).

### D2: Módulo `src/db/` como capa de acceso a datos
**Decisión**: crear `src/db/schema.ts` (DDL), `src/db/seed.ts` (datos iniciales), `src/db/queries.ts` (funciones de consulta) y `src/db/index.ts` (inicialización y export del cliente).  
**Rationale**: aísla la lógica de datos del resto de la app; los componentes React no acceden a SQL directamente.

### D3: Categorías como tabla maestra
**Decisión**: tabla `categories` con `id`, `name_es` (nombre en español) como fuente única de verdad. Recicladores y productores referencian `category_id`.  
**Rationale**: elimina la duplicación y garantiza que los nombres en español son consistentes en toda la app.

### D4: Leaflet + `react-leaflet` para el mapa de ruta
**Decisión**: usar `react-leaflet` como wrapper de Leaflet para React; tiles de OpenStreetMap (sin API key).  
**Alternativas consideradas**:
- `mapbox-gl-js`: requiere API key y tiene costos
- `deck.gl`: sobredimensionado para este caso de uso demo  
**Rationale**: Leaflet + OSM es open source, sin API key, con excelente integración React vía `react-leaflet`.

### D5: Datos de ruta como seed en la DB
**Decisión**: tabla `routes` con `recycler_id`, `visited_at` y tabla `route_points` con `route_id`, `order`, `lat`, `lng`, `label`. El mapa muestra la ruta más reciente del reciclador.  
**Rationale**: mantiene consistencia con la estrategia de base de datos; facilita reemplazar el seed con datos reales en el futuro.

## Risks / Trade-offs

- **[Riesgo] `sql.js` carga un archivo WASM (~1 MB)** → Mitigation: lazy-load con `React.lazy` o import dinámico en `src/db/index.ts`; mostrar spinner mientras carga
- **[Riesgo] Leaflet necesita CSS importado globalmente** → Mitigation: importar `leaflet/dist/leaflet.css` en el componente `RouteMap` o en `main.tsx`
- **[Riesgo] SSR/build estático puede romperse con `sql.js` WASM** → Mitigation: la app es puramente CSR (Vite + React), sin SSR, por lo que no aplica
- **[Trade-off] La DB se reinicializa en cada recarga** → Aceptable para demo; el seed es rápido y determinista

## Migration Plan

1. Instalar dependencias: `npm install sql.js react-leaflet leaflet`
2. Crear `src/db/` con schema, seed y queries
3. Reemplazar imports de `src/data/*` en componentes por calls a `src/db/queries`
4. Eliminar archivos `src/data/*.ts` al final
5. Aplicar fixes de UI (nav label, torta, categorías)
6. Agregar componente `RouteMap` en perfil de reciclador

## Open Questions

- ¿Se quiere persistir la DB en `localStorage` entre recargas en el futuro? (actualmente no, reinicia en cada sesión)
- ¿Los datos de ruta deben generarse aleatoriamente dentro de una ciudad específica, o se definen coordenadas fijas en el seed?
