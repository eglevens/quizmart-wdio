import * as signInPage from '../pageObjects/signIn.page'
import { getDiscoverPageTitleText } from '../pageObjects/discover.page'
import { getRegisterPageTitleText } from '../pageObjects/register'
import { getResetPassPageTitleText } from '../pageObjects/resetPass.page'
import { waitForUserProfileImageInHeader } from "../pageObjects/header.element"
import { openSignInPage } from '../pageObjects/page'
import { FormValidationMessage } from '../utils/formValidationMessages'
import * as userCredentials from '../utils/userCredentials'
import { expect } from 'chai'
import { HeaderText } from '../utils/enums'


describe('Sign in with email', () => {

    beforeEach(async function(){
        await openSignInPage()
    })

    it('Success sign in', async () => {
        await signInPage.signInWithEmail(userCredentials.email, userCredentials.pass)
        await waitForUserProfileImageInHeader()
        expect (await getDiscoverPageTitleText()).equals(HeaderText.discover)
    })

    it('Attempt to sign in with invalid password', async() => {
        await signInPage.signInWithEmail(userCredentials.email, userCredentials.invalidPass)
        browser.pause(2000)
        expect (await signInPage.getIncorrectCredentialsErrorText()).equals(FormValidationMessage.incorrectCredentialsErrorText)
    })

    it('Attempt to sign in with non registered email', async() => {
        const randomEmail = require('random-email')
        await signInPage.signInWithEmail(randomEmail(), userCredentials.invalidPass)
        expect (await signInPage.getIncorrectCredentialsErrorText()).equals(FormValidationMessage.incorrectCredentialsErrorText)
    })

    it('Validation error with invalid email format', async () => {
        for (const invalidFormatEmail of userCredentials.invalidFormatEmails) {
            await signInPage.fillEmailInputAndLoseFocus(invalidFormatEmail)
            expect(await signInPage.getEmailValidationErrorText()).equals(FormValidationMessage.emailValidationErrorText)
            await browser.refresh()  
        }
    })

    it('Validation error with too short and too long password', async () => {
        await signInPage.fillPassInputAndLoseFocus(userCredentials.shortPass)
        expect (await signInPage.getPassValidationErrorText()).equals(FormValidationMessage.passTooShortValidationErrorText)
        await browser.refresh()
        await signInPage.fillPassInputAndLoseFocus(userCredentials.longPass)
        expect (await signInPage.getPassValidationErrorText()).equals(FormValidationMessage.passTooLongValidationErrorText)
    })

    it('Validation error with empty email & password', async () => {
        await signInPage.clickSignInBtn()
        expect (await signInPage.getEmailValidationErrorText()).equals(FormValidationMessage.requiredValidationErrorText)
        expect (await signInPage.getPassValidationErrorText()).equals(FormValidationMessage.requiredValidationErrorText)
    })

    it('Open register page from sign in page', async () => {
        await signInPage.clickCreateAccLink()
        expect(await getRegisterPageTitleText()).equals(HeaderText.register)
    })

    it('Open reset password page from sign in page', async () => {
        await signInPage.clickForgotPassLink()
        expect(await getResetPassPageTitleText()).equals(HeaderText.resetPass)
    })

})