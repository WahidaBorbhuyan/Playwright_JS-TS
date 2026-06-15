import {test, expect} from '@playwright/test';
test('Multi select dropdown', async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.selectOption('#colors', ['blue', 'green', 'yellow']);
    await page.waitForTimeout(2000);
});