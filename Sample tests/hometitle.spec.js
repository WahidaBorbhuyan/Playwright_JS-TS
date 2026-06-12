import { test, expect } from '@playwright/test';

test('homePageTitle', async  ({ page }) => {
        await page.goto('https://www.demoblaze.com/#');
        const pageTitle = await page.title();
        console.log("Page title is :",pageTitle);
        await expect(page).toHaveTitle('STORE');
    });