import {test,expect} from '@playwright/test';
test('Dropdowns', async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.locator("#country").selectOption("India");
    await expect(page.locator("#country")).toHaveValue("india");
    // await page.locator("#country").selectOption({label :"USA"});
    // await expect(page.locator("#country")).toHaveValue("USA");
    // await page.locator("#country").selectOption({value :"germany"});
    // await expect(page.locator("#country")).toHaveValue("germany");
    // await page.locator("#country").selectOption({index : 1});
    await page.waitForTimeout(2000);
})

test('Dropdown options',async ({page})  =>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const countries = await page.locator("#country option")
    await expect(countries).toHaveCount(10);
    await page.waitForTimeout(2000);
})

test('Dropdown options array',async ({page})  =>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const countries = await page.$$("#country option")
    const countryLength = countries.length;
    await expect(countryLength).toBe(10);
    await page.waitForTimeout(2000);
})

test('Presence in dropdown',async ({page})  =>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const countries = await page.locator("#country").textContent();
    await expect(countries.includes("India")).toBeTruthy();
    await page.waitForTimeout(2000);
})

test('Loop through values',async ({page})  =>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    let status = false;
    const countries = await page.$$("#country option");
    for (const country of countries){
        const countryName = await country.textContent();
        if (countryName.includes("France")){
            status = true;
            break;
        }
    }
    await expect(status).toBeTruthy();
    await page.waitForTimeout(2000);
})

