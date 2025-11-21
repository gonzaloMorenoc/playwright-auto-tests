import { test as base, createBdd } from 'playwright-bdd';
import { PortfolioPage } from '../pages/PortfolioPage';

type MyFixtures = {
  portfolioPage: PortfolioPage;
};

export const test = base.extend<MyFixtures>({
  portfolioPage: async ({ page }, use) => {
    await use(new PortfolioPage(page));
  },
});

export const { Given, When, Then } = createBdd(test);