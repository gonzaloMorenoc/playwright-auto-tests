Feature: Portfolio Web Functionality
  Como QA Manager o Recruiter
  Quiero navegar por el portfolio de Gonzalo
  Para verificar su experiencia y proyectos

  Scenario: Verificación de carga y cambio de idioma (i18n)
    Given que navego a la web de Gonzalo Moreno
    Then debería ver el título principal "QA Automation Engineer"
    When cambio el idioma a Español
    Then debería ver el título principal "QA Automation Engineer"
  
  Scenario: Filtrado de proyectos (Tools)
    Given que navego a la web de Gonzalo Moreno
    When cambio el idioma a Español
    And filtro los proyectos por la categoría "Herramientas"
    Then debería ver proyectos listados
    And las tarjetas visibles deberían corresponder a herramientas de IA