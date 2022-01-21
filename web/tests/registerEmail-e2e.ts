import * as registerPage from "../pageObjects/signUp.page"
import * as signInPage from "../pageObjects/signIn.page"
import * as assert from "../values/assertionValue"

import { expect } from 'chai'


describe('Register with email from register page', () => {

    beforeEach(function () {
        registerPage.openSignUpPage()
    })

    it('Success register without newsletter', async () => {
    })

    it('Success register with newsletter', async () => {
    })

    it('Attempt to register with already registered email', async () => {
    })

    it('Validation error with invalid email format, too short password and not matching repeat password', async () => {
    })

    it('Validation error with empty email & passwords', async () => {
    })

    it('Open sign in page from register page', async () => {
        await registerPage.clickSignInBtn()
        await browser.pause(2000)
        expect(await signInPage.getSignInPageTitleText()).equals(assert.signInHeader)
    })



})