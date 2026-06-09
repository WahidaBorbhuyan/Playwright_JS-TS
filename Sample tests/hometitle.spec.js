import { test, expect } from '@playwright/test';

test('homePageTitle', async  ({ page }) => {
        await page.goto('https://www.demoblaze.com/#');
        await expect(page).toHaveTitle('STORE');
    });