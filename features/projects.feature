Feature: Gestión de Proyectos y UX
  Como usuario de la web
  Quiero buscar y cargar más proyectos, así como navegar en móvil
  Para encontrar ejemplos de código relevantes

  Scenario: Búsqueda de proyectos por tecnología
    Given que navego a la web de Gonzalo Moreno
    When busco el proyecto "TensorFlow"
    Then debería ver exactamente 1 proyectos en la lista
  
  Scenario: Búsqueda sin resultados
    Given que navego a la web de Gonzalo Moreno
    When busco el proyecto "Cobol"
    Then debería ver exactamente 0 proyectos en la lista

  Scenario: Paginación de proyectos (Load More)
    Given que navego a la web de Gonzalo Moreno
    Then debería ver exactamente 5 proyectos en la lista
    When hago clic en el botón "Cargar Más"
    Then debería ver más de 5 proyectos

  Scenario: Navegación en dispositivo Móvil
    Given que estoy en un dispositivo móvil
    When abro el menú de navegación
    Then debería ver las opciones del menú desplegadas