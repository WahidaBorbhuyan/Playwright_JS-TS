import {test, expect, request} from '@playwright/test';

const orderID;
const loginPayload = {userEmail:"tiwariR@gmail.com",userPassword:"RQ3d$Qa92ZiQx$P"};
const orderPayload = {orders:[{country:"India",productOrderedId:"6960ea76c941646b7a8b3dd5"}]};
test.beforeAll( async () => {
    //Login API call
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', 
        {
         data:loginPayload 
        }
    )
    await expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    const token = await loginResponseJson.token;
    console.log(token);
    globalThis.token = token;

    //Create order API call 
    const createOrder = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order"),
    {
        data : orderPayload,
        headers : {
            'Authorization': token,
    }}
    const orderResponseJson = await createOrder.json();
    orderID = orderResponseJson.orders[0]
});

test('Web API handling test', async ({page}) => {
    await page.addInitScript(token => {
        window.localStorage.setItem('token', token);
    }, 
    globalThis.token);
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByRole('button', { name: ' Add To Cart' }).first().click();
    await page.locator("//button[@routerlink='/dashboard/cart']").click();
    await page.getByRole('button', { name: 'Checkout' }).click();
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

