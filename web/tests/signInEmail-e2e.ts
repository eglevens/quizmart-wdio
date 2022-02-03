import * as signInPage from '../pageObjects/signIn.page'
import { getDiscoverPageTitleText, waitForUserProfileImageInHeaderIsDisplayed } from '../pageObjects/discover.page'
import { getRegisterPageTitleText, waitForRegisterFormBtnIsVisible } from '../pageObjects/register.page'
import { getResetPassPageTitleText, waitForSendRecoveryCodeBtnIsVisible } from '../pageObjects/resetPass.page'
import { openSignInPage } from '../pageObjects/page'
import { FormValidationMessage } from '../utils/formValidationMessages'
import * as userCredentials from '../utils/userCredentials'
import { expect } from 'chai'
import { HeaderText } from '../utils/enums'


describe('Sign in with email', () => {

    beforeEach(async function(){
        await openSignInPage()
        await signInPage.waitForSignInFormBtnIsClickable()
    })

    it('Success sign in', async () => {
        await signInPage.signInWithEmail(userCredentials.user1.email, userCredentials.user1.pass)
        await waitForUserProfileImageInHeaderIsDisplayed(6000)
        expect (await getDiscoverPageTitleText()).equals(HeaderText.discover)
    })

    it('Attempt to sign in with invalid password', async() => {
        await signInPage.signInWithEmail(userCredentials.user1.email, userCredentials.invalidPass)
        await signInPage.waitForSignInFormBtnIsClickable()
        expect (await signInPage.getIncorrectCredentialsErrorText()).equals(FormValidationMessage.incorrectCredentialsErrorText)
    })

    it('Attempt to sign in with non registered email', async() => {
        const randomEmail = require('random-email')
        await signInPage.signInWithEmail(randomEmail(), userCredentials.invalidPass)
        await signInPage.waitForSignInFormBtnIsClickable()
        expect (await signInPage.getIncorrectCredentialsErrorText()).equals(FormValidationMessage.incorrectCredentialsErrorText)
    })

    it('Validation error with invalid email format', async () => {
        for (const invalidFormatEmail of userCredentials.invalidFormatEmails) {
            await signInPage.fillEmailInputAndLoseFocus(invalidFormatEmail)
            expect (await signInPage.getEmailValidationErrorText()).equals(FormValidationMessage.emailValidationErrorText)
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
        await waitForRegisterFormBtnIsVisible()
        expect (await getRegisterPageTitleText()).equals(HeaderText.register)
    })

    it('Open reset password page from sign in page', async () => {
        await signInPage.clickForgotPassLink()
        await waitForSendRecoveryCodeBtnIsVisible()
        expect (await getResetPassPageTitleText()).equals(HeaderText.resetPass)
    })

})