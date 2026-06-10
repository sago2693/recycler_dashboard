## ADDED Requirements

### Requirement: Capa de base de datos SQLite embebida
La app DEBERÁ inicializar una base de datos SQLite en memoria (via `sql.js`) al arrancar, ejecutar el esquema DDL y poblarla con datos seed. Todos los componentes DEBERÁN obtener sus datos a través de las funciones de consulta de `src/db/queries.ts` y NO importar directamente de `src/data/`.

#### Scenario: Inicialización de la base de datos
- **WHEN** la aplicación carga por primera vez
- **THEN** la DB SQLite se inicializa en memoria, el esquema es creado y los datos seed son insertados antes de que cualquier vista se renderice

#### Scenario: Consulta de datos desde componentes
- **WHEN** un componente React necesita datos (recicladores, productores, métricas)
- **THEN** llama a una función de `src/db/queries.ts` que ejecuta SQL y retorna el resultado tipado

### Requirement: Tabla maestra de categorías
La base de datos DEBERÁ contener una tabla `categories` con `id` y `name_es` (nombre en español) como fuente única de verdad para los tipos de material reciclable.

#### Scenario: Categorías definidas una sola vez
- **WHEN** se consultan categorías en cualquier vista de la app
- **THEN** los nombres provienen de la tabla `categories` y están siempre en español

### Requirement: Datos de recicladores en la base de datos
La base de datos DEBERÁ contener una tabla `recyclers` con toda la información de los recicladores (nombre, estado, estadísticas) y una tabla `recycler_collections` con el historial mensual por reciclador y categoría.

#### Scenario: Lista de recicladores desde DB
- **WHEN** se navega a la vista de recicladores
- **THEN** los datos provienen de una consulta SQL a la tabla `recyclers`

### Requirement: Datos de productores en la base de datos
La base de datos DEBERÁ contener una tabla `producers` con información de productores (nombre, tipo, dirección, volumen, estado, reciclador asignado).

#### Scenario: Lista de productores desde DB
- **WHEN** se navega a la vista de productores
- **THEN** los datos provienen de una consulta SQL a la tabla `producers`

### Requirement: Datos de rutas en la base de datos
La base de datos DEBERÁ contener tablas `routes` y `route_points` para almacenar las rutas recorridas por cada reciclador, con coordenadas geográficas ordenadas y etiquetas.

#### Scenario: Consulta de última ruta de un reciclador
- **WHEN** se abre el perfil de un reciclador
- **THEN** se consulta la ruta más reciente de ese reciclador desde la tabla `routes` junto con sus puntos ordenados de `route_points`
