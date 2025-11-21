import { Page, Locator, expect } from '@playwright/test';

export class PortfolioPage {
    readonly page: Page;
    readonly heroTitle: Locator;
    readonly languageBtn: Locator;
    readonly languageDropdown: Locator;
    readonly esOption: Locator;
    readonly projectFilterBtns: Locator;
    readonly projectCards: Locator;
    readonly contactSection: Locator;
    readonly searchInput: Locator;
    readonly loadMoreBtn: Locator;
    readonly hamburgerBtn: Locator;
    readonly navMenu: Locator;

    constructor(page: Page) {
        this.page = page;

        this.heroTitle = page.locator('.hero-title');
        this.languageBtn = page.locator('#languageBtn');
        this.languageDropdown = page.locator('#languageDropdown');
        this.esOption = page.locator('.lang-option[data-lang="es"]');
        this.projectFilterBtns = page.locator('.filter-btn');
        this.projectCards = page.locator('.project-card:visible');
        this.contactSection = page.locator('#contacto');
        this.searchInput = page.locator('#projectSearch');
        this.loadMoreBtn = page.locator('#loadMoreBtn');
        this.hamburgerBtn = page.locator('#hamburger');
        this.navMenu = page.locator('#navMenu');
    }

    async navigate() {
        await this.page.goto('/');
    }

    async switchLanguageToSpanish() {
        await this.languageBtn.click();
        await expect(this.languageDropdown).toBeVisible();
        await this.esOption.click();
    }

    async filterProjectsBy(category: string) {
        const filterMap: Record<string, string> = {
            'Herramientas': 'tools',
            'Frameworks': 'framework',
            'Automation': 'automation',
            'Todos': 'all'
        };
        const filterValue = filterMap[category] || 'all';
        await this.projectFilterBtns.filter({ hasText: category }).click();
        
        await this.page.waitForTimeout(500); 
    }

    async verifyHeroText(text: string) {
        await expect(this.heroTitle).toContainText(text);
    }

    async verifyProjectCount(minCount: number) {
        await expect(this.projectCards.first()).toBeVisible();
        const count = await this.projectCards.count();
        expect(count).toBeGreaterThanOrEqual(minCount);
    }

    async verifyCardContainsTag(tagName: string) {
        const count = await this.projectCards.count();
        for (let i = 0; i < count; ++i) {
             await expect(this.projectCards.nth(i)).toContainText(tagName);
        }
    }

    async searchForProject(keyword: string) {
        await this.searchInput.scrollIntoViewIfNeeded();
        await this.searchInput.fill(keyword);
        await this.page.waitForTimeout(300);
    }

    async clickLoadMore() {
        await this.loadMoreBtn.scrollIntoViewIfNeeded();
        await this.loadMoreBtn.click();
        await this.page.waitForTimeout(300);
    }

    async verifyProjectCountGreaterThan(count: number) {
        const currentCount = await this.projectCards.count();
        expect(currentCount).toBeGreaterThan(count);
    }

    async openMobileMenu() {
        await this.hamburgerBtn.click();
    }

    async verifyMobileMenuIsOpen() {
        await expect(this.navMenu).toHaveClass(/active/);
        await expect(this.navMenu).toBeVisible();
    }
}