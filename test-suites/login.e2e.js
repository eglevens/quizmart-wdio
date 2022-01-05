const LoginPage = require('../web/src/pages/login.page');
const DiscoverPage = require('../web/src/pages/discover.page');

const email = 'eglvns@telesoftas.com';
const pass = 'myPasswordIs321'
const invalidPass = 'myPasswordIs31'

describe('Login cases', () => {

    beforeEach(function(){
        LoginPage.open();
    });

    it('should login with valid credentials and be redirected to discover page', async () => {
        await LoginPage.login(email, pass);
        await expect(browser).toHaveUrlContaining('discover');
        await expect(DiscoverPage.headerTitle).toBeDisplayed();
        
    });

    it('should stay on login with invalid password', async () => {
        await LoginPage.login(email, invalidPass);
        await expect(LoginPage.errInvalidPass).toBeDisplayed();
    });

});


