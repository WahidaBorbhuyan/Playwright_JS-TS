import { test, expect, request } from '@playwright/test';

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByRole('textbox', { name: 'email@example.com' }).fill("tiwariR@gmail.com")
    await page.getByRole('textbox', { name: 'enter your passsword' }).fill("RQ3d$Qa92ZiQx$P")
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    await context.storageState({ path: 'state.json' });
    await context2 = await browser.newContext({ storageState: 'state.json' })

})

test('Web API handling test', async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    },
        response.token);
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("//button[@routerlink='/dashboard/myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    await page.pause();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
});

