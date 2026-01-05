import { Locator, Page } from "@playwright/test";

export class LoginPage {
    private readonly page: Page; 
    private readonly usernameTextbox: Locator;
    private readonly passwordTextbox: Locator;
    private readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameTextbox = page.getByRole('textbox', { name: 'Username' });
        this.passwordTextbox = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.locator('#login-button');
    }

    async fillUsername(username: string) {
        await this.usernameTextbox.fill(username);
    }

    async fillPassword(password: string) {
        await this.passwordTextbox.fill(password);
    }

    async clickOnLogin() { 
                await this.loginButton.click();
    }

    async loginWithCredentials(username: string, password: string) {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickOnLogin();
    }
}