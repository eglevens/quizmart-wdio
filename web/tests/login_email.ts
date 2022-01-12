import * as LoginPage from "../pageObjects/login.page"

describe('Login with email', () => {
    it('Success login with email', async () => {
        await LoginPage.openLogin();
        await browser.pause(5000)
    });
});


