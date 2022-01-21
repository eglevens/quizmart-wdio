import * as registerPage from "../pageObjects/register"
import * as signInPage from "../pageObjects/signIn.page"
import * as assert from "../values/assertionValue"
import * as input from "../values/inputValue"

import { expect } from 'chai'


describe('Register with email from register page', () => {

    beforeEach(function () {
        registerPage.openRegisterPage()
    })

    it('Success register without newsletter', async () => {

    })

    it('Success register with newsletter', async () => {

    })

    it('Attempt to register with already registered email', async () => {
        await registerPage.registerWithEmail(input.email, input.pass, input.pass)
        expect(await registerPage.getAlreadyRegisteredUserErrorText()).equals(assert.alreadyRegisteredUserErrorText)
    })

    it('Validation error with invalid email format, too short password and not matching repeat password', async () => {

    })

    it('Validation error with empty email & passwords', async () => {
        await registerPage.clickRegisterBtn()
        expect(await registerPage.getEmailValidationErrorText()).equals(assert.requiredValidationErrorText)
        expect(await registerPage.getPassValidationErrorText()).equals(assert.requiredValidationErrorText)
        expect(await registerPage.getPassRepeatValidationErrorText()).equals(assert.requiredValidationErrorText)
    })

    it('Open sign in page from register page', async () => {
        await registerPage.clickSignInBtn()
        await browser.pause(2000)
        expect(await signInPage.getSignInPageTitleText()).equals(assert.signInHeader)
    })

})