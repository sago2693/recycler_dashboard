## Context

El dashboard fue construido como demo genérico bajo el nombre "EcoCollect". El cliente real es **Gaiarec**, una organización hispanohablante. Los cambios son puramente de contenido de texto: nombres de organización y etiquetas de navegación/UI. No hay lógica de negocio ni modelos de datos involucrados.

Archivos afectados:
- `src/components/Sidebar.tsx` — nombre de org y etiquetas de nav
- `src/pages/Dashboard/index.tsx` — encabezados de vista
- `src/pages/Recyclers/RecyclersList.tsx` — encabezados y etiquetas
- `src/pages/Recyclers/RecyclerDetail.tsx` — encabezados y etiquetas
- `src/pages/Producers/index.tsx` — encabezados y etiquetas
- `openspec/specs/app-shell/spec.md` — requisitos actualizados

## Goals / Non-Goals

**Goals:**
- Cambiar el nombre de la organización de "EcoCollect" a "Gaiarec" en el sidebar
- Traducir las etiquetas de navegación al español: Panel, Recicladores, Productores
- Traducir encabezados visibles en las páginas principales al español
- Actualizar el spec de `app-shell` para reflejar los nuevos requisitos de texto

**Non-Goals:**
- No se implementará un sistema de i18n/l10n (sin librerías de traducción dinámica)
- No se traducen mensajes de error o texto técnico de consola
- No se cambia la estructura de datos ni los nombres de propiedades en código
- No se modifica el diseño visual ni los colores

## Decisions

**Decisión: Textos hardcoded en español (sin i18n)**

El cambio es para un cliente específico hispanohablante. No se anticipan usuarios en otros idiomas, por lo que un sistema de internacionalización (i18n) sería over-engineering. Los textos se reemplazan directamente en los componentes.

Alternativa considerada: usar `react-i18next`. Descartada por complejidad innecesaria para un cliente único.

---

**Decisión: Etiquetas de navegación**

| Inglés | Español |
|---|---|
| Dashboard | Panel |
| Recyclers | Recicladores |
| Producers | Productores |

Se usa "Panel" en lugar de "Tablero" por ser más conciso y natural en contextos de software.

## Risks / Trade-offs

- [Riesgo: Rutas URL permanecen en inglés] → Las rutas (`/dashboard`, `/recyclers`, `/producers`) no cambian para evitar romper bookmarks o links externos. Solo cambia el texto visible.
- [Riesgo: Textos embebidos en múltiples archivos] → Si se necesita cambiar el idioma en el futuro, habrá que editar archivo por archivo. Mitigación: documentado en este diseño; considerar i18n si el scope crece.
