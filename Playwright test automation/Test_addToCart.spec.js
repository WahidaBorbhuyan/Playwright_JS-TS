import {test, expect} from '@playwright/test';

test('Web API handling test', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator("#userEmail").fill("tiwariR@gmail.com");
    await page.locator("#userPassword").fill("RQ3d$Qa92ZiQx$P");
    await page.locator("#login").click();
    await page.locator('button').filter({ hasText: 'Add To Cart' }).first().click();
    await page.waitForLoadState("networkidle");
    await page.getByRole('button', { name: 'Cart 1' }).click();
    await page.getByRole('button', { name: 'Checkout' }).click();
    //await page.locator("//input[@fdprocessedid='ehesyd']").fill("12345");
    //await page.locator("//input[@fdprocessedid='j9hvr8']").fill("Tiwari B");
    //await page.locator('[name="coupon"]').fill("ABC");
    await page.getByPlaceholder('Select Country').pressSequentially("ind", { delay: 150 }) 
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
    }
    await page.locator('a:has-text("PLACE ORDER")').click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
 
});

