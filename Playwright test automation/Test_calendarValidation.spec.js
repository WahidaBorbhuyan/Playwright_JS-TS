import {test,expect} from '@playwright/test';

test('Calendar validation', async ({page}) => {
    const month = "7"
    const year = "2027"
    const date = "17"
    const expectedList = [month,date,year];
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__calendar-button").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator('button').filter({ hasText: year }).click();
    await page.locator(".react-calendar__tile").nth(Number(month)-1).click();
    await page.locator(".react-calendar__tile").filter({ hasText: date }).click(); 
    const calendarDate = await page.locator(".react-date-picker__inputGroup__input"); 
    for (let i = 0; i < expectedList.length; i++) { 
        const value = await calendarDate.nth(i).inputValue();
        expect(value).toEqual(expectedList[i]);
    }

})