## MODIFIED Requirements

### Requirement: Application layout with sidebar navigation
El app shell DEBERÁ proveer una barra lateral de navegación persistente con enlaces a las tres vistas principales: Dashboard, Recicladores y Productores. El encabezado de la barra lateral DEBERÁ mostrar el nombre de la organización **Gaiarec** y el subtítulo **Asociación de Recicladores**.

#### Scenario: El usuario ve la navegación
- **WHEN** la aplicación carga
- **THEN** una barra lateral es visible con enlaces de navegación etiquetados "Dashboard", "Recicladores" y "Productores", más el nombre "Gaiarec" en la parte superior

#### Scenario: El encabezado muestra la marca correcta
- **WHEN** el usuario ve cualquier vista de la aplicación
- **THEN** el encabezado de la barra lateral muestra "Gaiarec" como nombre principal y "Asociación de Recicladores" como subtítulo
