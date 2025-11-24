Playwright Automation Framework

Este proyecto contiene una suite de pruebas automatizadas E2E (End-to-End) para validar la funcionalidad y la interfaz de usuario del sitio web gonzalomorenoc.es.

El framework está construido utilizando Playwright con TypeScript e implementa la metodología BDD (Behavior Driven Development) mediante Gherkin y playwright-bdd.

Stack Tecnológico

Lenguaje: TypeScript

Motor de Pruebas: Playwright

BDD: Cucumber (vía playwright-bdd)

CI/CD: Jenkins

Contenedores: Docker

Prerrequisitos

Node.js (v18 o superior)

NPM

Docker Desktop (para la ejecución en CI/CD)

Instalación

Clona el repositorio e instala las dependencias necesarias:

npm ci
npx playwright install --with-deps chromium


Ejecución de Pruebas

Ejecución en modo Headless

Compila los archivos BDD y ejecuta todos los tests en segundo plano:

npm test


Ejecución en modo UI

Abre la interfaz interactiva de Playwright para depuración y visualización paso a paso:

npm run test:ui


Visualizar Reporte

Abre el reporte HTML de la última ejecución:

npm run report


Estructura del Proyecto

features/: Archivos .feature con los escenarios de prueba en lenguaje Gherkin.

pages/: Clases del patrón Page Object Model (POM) que mapean los elementos web.

steps/: Definiciones de pasos (Step Definitions) y configuración de Fixtures.

playwright.config.ts: Configuración global del framework.

Dockerfile: Definición de la imagen para el entorno de ejecución aislado.

Jenkinsfile: Definición de la pipeline declarativa para CI/CD.

Configuración de CI/CD con Jenkins y Docker

Para ejecutar la pipeline de integración continua localmente, se utiliza un contenedor de Jenkins configurado para acceder al socket de Docker del sistema anfitrión.

1. Iniciar Jenkins

Ejecuta el siguiente comando para levantar el contenedor de Jenkins:

docker run -d -p 8080:8080 -p 50000:50000 \
  --name jenkins-local \
  --restart=on-failure \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkins/jenkins:lts-jdk17


2. Configuración Inicial

Accede a http://localhost:8080.

Obtén la contraseña de administrador ejecutando:

docker exec jenkins-local cat /var/jenkins_home/secrets/initialAdminPassword


Completa la instalación de los plugins sugeridos.

Instala los siguientes plugins adicionales desde Administrar Jenkins > Plugins:

Docker Pipeline

HTML Publisher

3. Crear la Pipeline

Crea una "Nueva Tarea" de tipo Pipeline.

En la sección Pipeline, selecciona Pipeline script from SCM.

Selecciona Git e introduce la URL de tu repositorio (o la ruta local absoluta file:///...).

Asegúrate de que la ruta del script sea Jenkinsfile.

4. Visualización de Reportes HTML

Para permitir que Jenkins muestre correctamente los estilos CSS del reporte de Playwright, ejecuta el siguiente comando en Administrar Jenkins > Consola de Script:

System.setProperty("hudson.model.DirectoryBrowserSupport.CSP", "")


Nota: Esta configuración se reinicia si el contenedor de Jenkins se detiene. Debe aplicarse cada vez que se reinicie el servidor para visualizar los reportes correctamente.