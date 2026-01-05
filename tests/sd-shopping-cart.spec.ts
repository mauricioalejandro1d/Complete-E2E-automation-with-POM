import { test, expect } from '@playwright/test';
import { LoginPage } from './pageobjects/LoginPage';
import { CheckoutPage } from './pageobjects/checkoutPage';


test('compra aleatoria funcional', async ({ page }) => {
    test.setTimeout(60000);

    const login = new LoginPage(page);
    await page.goto('https://www.saucedemo.com/');
    await login.loginWithCredentials(process.env.SAUCE_USERNAME!, process.env.SAUCE_PASSWORD!);

    await page.waitForURL('**/inventory.html');
    const items = page.locator('.inventory_item'); 
    await expect(items.first()).toBeVisible();

    const count = await items.count();
    const randomIndex = Math.floor(Math.random() * count);
    const randomItem = items.nth(randomIndex);
    const name = await randomItem.locator('.inventory_item_name').innerText();
    const description = await randomItem.locator('.inventory_item_desc').innerText();
    const price = await randomItem.locator('.inventory_item_price').innerText();

    await randomItem.getByRole('button', { name: 'Add to cart' }).click();
    await page.locator('.shopping_cart_link').click();

    const actualName = await page.locator('.inventory_item_name').innerText();
    const actualDescription = await page.locator('.inventory_item_desc').innerText();
    const actualPrice = await page.locator('.inventory_item_price').innerText();

    expect(actualName).toBe(name);
    expect(actualDescription).toBe(description);
    expect(actualPrice).toBe(price);

    await page.click('#checkout');

    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillFirstname('Mauricio Alejandro');
    await checkoutPage.fillLastname('Carrasquel Torres');
    await checkoutPage.fillZipcode('08002');
    await checkoutPage.fillContinuebutton();
    await checkoutPage.fillFinishbutton();

    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});
