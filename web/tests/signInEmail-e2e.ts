import * as signInPage from '../pageObjects/signIn.page'
import * as discoverPage from '../pageObjects/discover.page'
import * as page from '../pageObjects/page'
import * as Validations from '../utils/validations'
import * as userCredentials from '../utils/userCredentials'
import { expect } from 'chai'
import * as Enums from '../utils/enums'
import randomEmail = require('random-email')

describe('Sign in with email', () => {

    beforeEach(async function(){
        await page.openSignInPage()
        await page.waitUntilFormButtonByTextIsClickable(Enums.Button.SignIn)
    })

    it('Success sign in', async () => {
        await signInPage.signInWithEmail(userCredentials.user1.email, userCredentials.user1.pass)
        await discoverPage.waitForSortButtonIsDisplayed(6000)
        expect (await page.getPageHeaderText()).equals(Enums.Header.Discover)
    })

    it('Attempt to sign in with invalid password', async() => {
        await signInPage.signInWithEmail(userCredentials.user1.email, userCredentials.invalidPass)
        await page.waitUntilFormButtonByTextIsClickable(Enums.Button.SignIn)
        expect (await page.getBackendFormValidationError()).equals(Validations.Form.IncorrectCredentials)
    })

    it('Attempt to sign in with non registered email', async() => {
        await signInPage.signInWithEmail(randomEmail, userCredentials.invalidPass)
        await page.waitUntilFormButtonByTextIsClickable(Enums.Button.SignIn)
        expect (await page.getBackendFormValidationError()).equals(Validations.Form.IncorrectCredentials)
    })

    it('Validation error with invalid email format', async () => {
        for (const invalidFormatEmail of userCredentials.invalidFormatEmails) {
            await signInPage.fillEmailInputAndLoseFocus(invalidFormatEmail)
            expect (await page.getFrontendInputValidationTextByInputName(Enums.Input.Email)).equals(Validations.Form.InvalidEmail)
            await browser.refresh()  
        }
    })

    it('Validation error with too short and too long password', async () => {
        await signInPage.fillPassInputAndLoseFocus(userCredentials.shortPass)
        expect (await page.getFrontendInputValidationTextByInputName(Enums.Input.Password)).equals(Validations.Form.PassTooShort)
        await signInPage.fillPassInputAndLoseFocus(userCredentials.longPass)
        expect (await page.getFrontendInputValidationTextByInputName(Enums.Input.Password)).equals(Validations.Form.PassTooLong)
    })

    it('Validation error with empty email & password', async () => {
        await page.clickOnFormButton(Enums.Button.SignIn)
        expect (await page.getFrontendInputValidationTextByInputName(Enums.Input.Email)).equals(Validations.Form.Required)
        expect (await page.getFrontendInputValidationTextByInputName(Enums.Input.Password)).equals(Validations.Form.Required)
    })

    it('Open register page from sign in page', async () => {
        await page.clickOnLink(Enums.Link.SignUp)
        await page.waitUntilFormButtonByTextIsVisibleInViewport(Enums.Button.Register)
        expect (await page.getPageHeaderText()).equals(Enums.Header.Register)
    })

    it('Open reset password page from sign in page', async () => {
        await page.clickOnLink(Enums.Link.ResetPass)
        await page.waitUntilFormButtonByTextIsVisibleInViewport(Enums.Button.SendRecoveryCode)
        expect (await page.getPageHeaderText()).equals(Enums.Header.ResetPass)
    })

})