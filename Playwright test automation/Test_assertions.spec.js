import {test,expect} from '@playwright/test';
//Cloudfare error!!!
test('Assertions', async ({page}) => {
    await page.goto("https://demo.nopcommerce.com/login");
    // await page.getByRole("link",{name :"Register"}).click();
    // await page.getByRole("radio",{name :"Female"}).check(); 
    // await expect(page.getByRole("radio",{name :"Female"})).toBeChecked();
    // await page.locator("#FirstName").fill("Wahida"); 
    // await page.locator("#LastName").fill("B");
    // await page.locator("#Email").fill("wahida.b@example.com");
    // await page.locator("#Password").fill("Wahida@123");
    // await page.locator("#ConfirmPassword").fill("Wahida@123");
    // await page.getByRole("button",{name :"Register"}).click();
    // await expect(page.getByText("Your registration completed")).toBeVisible();
})
//Hard assertion : If the assertion fails, the test will stop executing and be marked as failed.
//Soft assertion : If the assertion fails, the test will continue executing and be marked as failed at the end of the test. 
//await expect.soft(page.getByText("Your registration completed")).toBeVisible();