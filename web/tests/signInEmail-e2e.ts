import * as signInPage from "../pageObjects/signIn.page"
import * as discoverPage from "../pageObjects/discover.page"
import * as registerPage from "../pageObjects/register"
import * as resetPassPage from "../pageObjects/resetPass.page"
import * as assert from '../values/assertionValue'
import * as input from '../values/inputValue'
import { expect } from 'chai'



describe('Sign in with email', () => {

    beforeEach(function(){
        signInPage.openSignInPage()
    })

    it('Success sign in', async () => {
        await signInPage.signInWithEmail(input.email, input.pass)
        await browser.pause(2000)
        expect (await discoverPage.getDiscoverPageTitleText()).equals(assert.discoverHeader)
    })

    it('Attempt to sign in with invalid password', async() => {
        await signInPage.signInWithEmail(input.email, input.invalidPass)
        browser.pause(2000)
        expect (await signInPage.getIncorrectCredentialsErrorText()).equals(assert.incorrectCredentialsErrorText)
    })

    it('Attempt to sign in with non registered email', async() => {
        await signInPage.signInWithEmail(input.unregistredEmail, input.invalidPass)
        expect (await signInPage.getIncorrectCredentialsErrorText()).equals(assert.incorrectCredentialsErrorText)
    })

    it('Validation error with invalid email format', async () => {
        for (const invalidFormatEmail of input.invalidFormatEmails) {
            await signInPage.fillEmailInputAndLoseFocus(invalidFormatEmail)
            expect(await signInPage.getEmailValidationErrorText()).equals(assert.emailValidationErrorText)
            await browser.refresh()  
        }
    })

    it('Validation error with too short and too long password', async () => {
        await signInPage.fillPassInputAndLoseFocus(input.shortPass)
        expect (await signInPage.getPassValidationErrorText()).equals(assert.passTooShortValidationErrorText)
        await browser.refresh()
        await signInPage.fillPassInputAndLoseFocus(input.longPass)
        expect (await signInPage.getPassValidationErrorText()).equals(assert.passTooLongValidationErrorText)
    })

    it('Validation error with empty email & password', async () => {
        await signInPage.clickSignInBtn()
        expect (await signInPage.getEmailValidationErrorText()).equals(assert.requiredValidationErrorText)
        expect (await signInPage.getPassValidationErrorText()).equals(assert.requiredValidationErrorText)
    })

    it('Open register page from sign in page', async () => {
        await signInPage.clickCreateAccBtn()
        expect(await registerPage.getRegisterPageTitleText()).equals(assert.registerHeader)
    })

    it('Open reset password page from sign in page', async () => {
        await signInPage.clickForgotPassBtn()
        expect(await resetPassPage.getResetPassPageTitleText()).equals(assert.resetPassHeader)
    })

})