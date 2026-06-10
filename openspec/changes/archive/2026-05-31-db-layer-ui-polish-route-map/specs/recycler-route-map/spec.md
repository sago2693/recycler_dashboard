## ADDED Requirements

### Requirement: Mapa de última ruta del reciclador
El perfil de cada reciclador DEBERÁ mostrar, debajo del gráfico de "Recolecciones mensuales", un mapa interactivo (Leaflet + OpenStreetMap) con la última ruta registrada. Los puntos de parada DEBERÁN estar numerados en el orden en que fueron visitados y conectados por una línea.

#### Scenario: El usuario ve el mapa de ruta
- **WHEN** el usuario abre el perfil de un reciclador
- **THEN** debajo del gráfico mensual aparece un mapa con los puntos de la última ruta numerados y conectados por una polilínea en orden de visita

#### Scenario: Puntos numerados en el mapa
- **WHEN** el mapa de ruta se renderiza
- **THEN** cada punto de parada muestra un marcador con el número de orden de visita (1, 2, 3, …)

#### Scenario: Sin ruta registrada
- **WHEN** el reciclador no tiene ninguna ruta registrada en la base de datos
- **THEN** el mapa no se muestra y se despliega un mensaje indicando que no hay ruta disponible
