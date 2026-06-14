import {test,expect} from '@playwright/test';
test('Dropdowns', async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.locator("#country").selectOption("India");
    await expect(page.locator("#country")).toHaveValue("India");
    // await page.locator("#country").selectOption({label :"USA"});
    // await expect(page.locator("#country")).toHaveValue("USA");
    // await page.locator("#country").selectOption({value :"germany"});
    // await expect(page.locator("#country")).toHaveValue("germany");
    // await page.locator("#country").selectOption({index : 1});
})

test('Dropdown options',async ({page})  =>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const countries = await page.locator("#country option")
    await expect(countries).toHaveCount(10);
})

test('Dropdown options',async ({page})  =>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const countries = await page.$$("#country option")
    countryLength = countries.length;
    await expect(countryLength).toBe(10);
})

test('Prensence in dropdown',async ({page})  =>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const countries = await page("#country").textContent();
    await expect(content.includes("India")).toBeTruthy();
})

test('Loop through values',async ({page})  =>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    let status = false;
    const countries = await page.$$("#country option");
    for (const country of countries){
        const countryName = await country.textContent();
        if (countryName === "India"){
            status = true;
            break;
        }
    }
    await expect(status).toBeTruthy();
})