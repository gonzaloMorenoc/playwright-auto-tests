import { expect } from '@playwright/test';
import { Given, When, Then } from './fixtures';

Given('que navego a la web de Gonzalo Moreno', async ({ portfolioPage }) => {
    await portfolioPage.navigate();
});

When('cambio el idioma a Español', async ({ portfolioPage }) => {
    await portfolioPage.switchLanguageToSpanish();
});

Then('debería ver el título principal {string}', async ({ portfolioPage }, title) => {
    await portfolioPage.verifyHeroText(title);
});

When('filtro los proyectos por la categoría {string}', async ({ portfolioPage }, category) => {
    // Scrollemos primero a la sección de proyectos para asegurar visibilidad
    await portfolioPage.page.locator('#proyectos').scrollIntoViewIfNeeded();
    await portfolioPage.filterProjectsBy(category);
});

Then('debería ver proyectos listados', async ({ portfolioPage }) => {
    await portfolioPage.verifyProjectCount(1);
});

Then('las tarjetas visibles deberían corresponder a herramientas de IA', async ({ portfolioPage }) => {
    // Verificamos por ejemplo que aparezca "AI" o "Python" en los tags
    await portfolioPage.verifyCardContainsTag('Python'); 
});

When('busco el proyecto {string}', async ({ portfolioPage }, keyword) => {
    await portfolioPage.searchForProject(keyword);
});

Then('debería ver exactamente {int} proyectos en la lista', async ({ portfolioPage }, count) => {
    await portfolioPage.verifyProjectCount(count);
});

When('hago clic en el botón "Cargar Más"', async ({ portfolioPage }) => {
    await portfolioPage.clickLoadMore();
});

Then('debería ver más de {int} proyectos', async ({ portfolioPage }, count) => {
    await portfolioPage.verifyProjectCountGreaterThan(count);
});

Given('que estoy en un dispositivo móvil', async ({ portfolioPage }) => {
    // Forzamos un viewport de móvil (iPhone 12/13 aprox)
    await portfolioPage.page.setViewportSize({ width: 390, height: 844 });
    await portfolioPage.navigate();
});

When('abro el menú de navegación', async ({ portfolioPage }) => {
    await portfolioPage.openMobileMenu();
});

Then('debería ver las opciones del menú desplegadas', async ({ portfolioPage }) => {
    await portfolioPage.verifyMobileMenuIsOpen();
});