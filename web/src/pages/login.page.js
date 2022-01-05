

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputEmail() {
        return $('input[name="email"]');
    }

    get inputPassword() {
        return $('input[name="password"]');
    }

    get btnSignIn() {
        return $('button[type="submit"]');
    }

    get errInvalidPass() {
        return $('h3=The email address or password is incorrect')
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login(email, password) {
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
        await this.btnSignIn.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open() {
        return super.open('/sign-in');
    }
}

module.exports = new LoginPage();
