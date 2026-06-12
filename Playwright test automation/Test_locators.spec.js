import { test, expect } from '@playwright/test';
import { link } from 'node:fs';
test('Locators', async ({page}) => {
    await page.goto("https://www.demoblaze.com/#");
    await page.getByRole("link",{name :"Samsung galaxy s6"} ).click();
    await page.click("btn")
})