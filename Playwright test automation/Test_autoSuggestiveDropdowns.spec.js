import {test,expect} from '@playwright/test';
test('Auto suggestive dropdown', async ({page}) => {
    await page.goto("https://www.redbus.in/");
    await page.locator('#srcinput').fill('Delhi');
    await page.waitForTimeout(2000);
    const pickUpLocation = await page.getByRole('option').all();
    for(let location of pickUpLocation){
        const locationText = await location.textContent();  
        if(locationText.includes('AAAAA, New Delhi')){
            await location.click();
            break;
        }
    }

})
