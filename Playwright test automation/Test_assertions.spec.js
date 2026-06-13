import {page,expect} from '@playwright/test';
test('Assertions', async ({page}) => {
    await page.goto("https://demo.nopcommerce.com/");
    await page.getByRole("link",{name :"Register"}).click();
    await page.getByRole("radio",{name :"Female"}).check(); 
    await expect(page.getByRole("radio",{name :"Female"})).toBeChecked();
    await page.locator("#FirstName").fill("Wahida"); 
    await page.locator("#LastName").fill("B");
    await page.locator("#Email").fill("wahida.b@example.com");
    await page.locator("#Password").fill("Wahida@123");
    await page.locator("#ConfirmPassword").fill("Wahida@123");
    await page.getByRole("button",{name :"Register"}).click();
    await expect(page.getByText("Your registration completed")).toBeVisible();
})