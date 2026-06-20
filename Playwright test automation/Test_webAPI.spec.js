import {test, expect, request} from '@playwright/test';
import { APIUtils } from '../Utils/APIUtils';
let token;
let orderId;
const loginPayload = {userEmail:"tiwariR@gmail.com",userPassword:"RQ3d$Qa92ZiQx$P"};
const orderPayload = {orders:[{country:"India",productOrderedId:"6960ea76c941646b7a8b3dd5"}]};

let response;
test.beforeAll( async () => {

    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext,loginPayload)
    response = await apiUtils.createOrder(orderPayload)
    
});

test('Web API handling test', async ({page}) => {

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

