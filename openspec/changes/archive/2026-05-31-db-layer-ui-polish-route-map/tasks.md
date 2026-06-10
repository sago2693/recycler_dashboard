## 1. Dependencias

- [x] 1.1 Instalar `sql.js` como dependencia del proyecto (`npm install sql.js`)
- [x] 1.2 Instalar `react-leaflet` y `leaflet` (`npm install react-leaflet leaflet`)
- [x] 1.3 Instalar tipos de TypeScript para leaflet (`npm install -D @types/leaflet`)
- [x] 1.4 Copiar el archivo WASM de `sql.js` a `public/` para que Vite lo sirva correctamente

## 2. Capa de base de datos — Esquema

- [x] 2.1 Crear `src/db/schema.ts` con el DDL: tablas `categories`, `recyclers`, `recycler_collections`, `producers`, `routes`, `route_points`
- [x] 2.2 Definir tipos TypeScript correspondientes al esquema en `src/db/types.ts`

## 3. Capa de base de datos — Seed

- [x] 3.1 Crear `src/db/seed.ts` migrando los datos de `src/data/recyclers.ts` a sentencias INSERT para `recyclers` y `recycler_collections`
- [x] 3.2 Migrar los datos de `src/data/producers.ts` a sentencias INSERT para `producers`
- [x] 3.3 Migrar los datos de `src/data/metrics.ts` a sentencias INSERT para `categories` (con `name_es` en español) y datos de tendencias mensuales
- [x] 3.4 Agregar datos seed de rutas: 1 ruta por reciclador en `routes` con 5–8 puntos en `route_points` con coordenadas demo (lat/lng dentro de una ciudad de referencia)

## 4. Capa de base de datos — Queries e inicialización

- [x] 4.1 Crear `src/db/index.ts` que inicializa `sql.js`, ejecuta el esquema y el seed, y exporta el cliente de base de datos
- [x] 4.2 Crear `src/db/queries.ts` con funciones: `getRecyclers()`, `getRecyclerById(id)`, `getProducers()`, `getMetrics()`, `getCategoryBreakdown()`, `getLastRouteByRecycler(id)`
- [x] 4.3 Integrar la inicialización de la DB en `src/main.tsx` o en un `DbProvider` de React para que esté disponible antes del primer render

## 5. Migración de componentes a la nueva capa de datos

- [x] 5.1 Actualizar `src/pages/Dashboard/index.tsx` para usar `getMetrics()` y `getCategoryBreakdown()` desde `src/db/queries`
- [x] 5.2 Actualizar `src/pages/Recyclers/RecyclersList.tsx` para usar `getRecyclers()` desde `src/db/queries`
- [x] 5.3 Actualizar `src/pages/Recyclers/RecyclerDetail.tsx` para usar `getRecyclerById()` desde `src/db/queries`
- [x] 5.4 Actualizar `src/pages/Producers/index.tsx` para usar `getProducers()` desde `src/db/queries`
- [x] 5.5 Eliminar los archivos `src/data/recyclers.ts`, `src/data/producers.ts` y `src/data/metrics.ts`

## 6. Correcciones de UI

- [x] 6.1 Cambiar etiqueta de navegación "Panel" → "Dashboard" en `src/components/Sidebar.tsx`
- [x] 6.2 En el gráfico de torta de `src/pages/Dashboard/index.tsx`, eliminar las etiquetas externas de cada sector (prop `label` o `renderCustomizedLabel` de Recharts) dejando solo tooltip y leyenda

## 7. Mapa de ruta del reciclador

- [x] 7.1 Importar el CSS de Leaflet en `src/main.tsx` (`import 'leaflet/dist/leaflet.css'`)
- [x] 7.2 Crear componente `src/components/RouteMap.tsx` que reciba los puntos de ruta y renderice un `MapContainer` de `react-leaflet` con una `Polyline` y marcadores numerados
- [x] 7.3 Integrar `RouteMap` en `src/pages/Recyclers/RecyclerDetail.tsx` debajo del gráfico de "Recolecciones mensuales", pasando los puntos de `getLastRouteByRecycler(id)`
- [x] 7.4 Manejar el caso de ausencia de ruta: mostrar mensaje "Sin ruta disponible" si no hay datos

## 8. Verificación

- [x] 8.1 Confirmar que la navegación lateral muestra "Dashboard", "Recicladores" y "Productores"
- [x] 8.2 Confirmar que la gráfica de torta en `/dashboard` no muestra etiquetas junto a los sectores
- [x] 8.3 Confirmar que todas las categorías de materiales en la vista de recicladores aparecen en español
- [x] 8.4 Confirmar que el mapa de ruta se muestra en el perfil de cada reciclador con puntos numerados y línea de recorrido
- [x] 8.5 Ejecutar `npm run build` y confirmar que no hay errores de compilación
