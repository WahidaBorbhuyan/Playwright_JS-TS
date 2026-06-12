import { test, expect } from '@playwright/test';
import { link } from 'node:fs';
test('Locators', async ({page}) => {
    await page.goto("https://www.demoblaze.com/#");
    await page.getByRole("link",{name :"Samsung galaxy s6"} ).click();
    page.once("dialog", async dialog => {
        await dialog.accept();
    });
    await page.getByRole("link",{name :"Cart"}).click();
    await page.getByText("Place Order",{exact : true}).click();
    await page.locator("#name").fill("Wahida Borbhuyan")
    await page.locator("#country").fill("India")
    await page.locator("#city").fill("Guwahati")
    await page.locator("#card").fill("1234567890")
    await page.locator("#month").fill("June")
    await page.locator("#year").fill("2024")
    await page.getByRole("button",{name :"Purchase"}).click();
    await expect(page.getByText("Thank you for your purchase!")).toBeVisible();
    await page.once("diaglog",async dialog => {
        await dialog.accept();
    })
})
