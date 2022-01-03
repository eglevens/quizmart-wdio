const LoginPage = require('../pageobjects/login.page');
const DiscoverPage = require('../pageobjects/discover.page');

describe('My Login application', () => {
    it('should login with valid credentials and br redirected to discover page', async () => {
        await LoginPage.open();
        await LoginPage.login('eglvns@telesoftas.com', 'myPasswordIs321');
        
        await expect(browser).toHaveUrlContaining('discover');
        await expect(DiscoverPage.headerTitle).toBeDisplayed();
        
    });

    it('should stay on login with invalid password', async () => {
        await LoginPage.open();
        await LoginPage.login('eglvns@telesoftas.com', 'myPasswordIs31');

        await expect(LoginPage.errInvalidPass).toBeDisplayed();
    });

});


