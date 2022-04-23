import * as signInPage from '../pageObjects/signIn.page'
import * as page from '../pageObjects/page'
import * as validations from '../utils/validations'
import * as userCredentials from '../utils/userCredentials'
import * as api from '../utils/api'
import { expect } from 'chai'
import * as enums from '../utils/enums'
import randomEmail = require('random-email')

describe('Sign in with email', () => {

    beforeEach(async function () {
        await page.openSignInPage()
    })

    it('Success sign in', async () => {
        await signInPage.signInWithEmail(userCredentials.user1.email, userCredentials.user1.pass)
        expect(await page.getPageHeaderTextAfterLogin()).equals(enums.Header.Discover)
    })

    it('Attempt to sign in with invalid password', async () => {
        await signInPage.signInWithEmail(userCredentials.user1.email, userCredentials.invalidPass)

        expect(await signInPage.getFormValidation()).equals(validations.Form.IncorrectCredentials)
    })

    it('Attempt to sign in with non registered email', async () => {
        await signInPage.signInWithEmail(randomEmail(), userCredentials.invalidPass)
        expect(await signInPage.getFormValidation()).equals(validations.Form.IncorrectCredentials)
    })

    it('Validation error with invalid email format', async () => {
        for (const invalidFormatEmail of userCredentials.invalidFormatEmails) {
            await signInPage.fillEmailInputAndLoseFocus(invalidFormatEmail)
            expect(await page.getInputValidationTextByInputName(enums.Input.Email)).equals(validations.Form.InvalidEmail)
            await browser.refresh()
        }
    })

    it('Validation error with too short and too long password', async () => {
        await signInPage.fillPassInputAndLoseFocus(userCredentials.shortPass)
        expect(await page.getInputValidationTextByInputName(enums.Input.Password)).equals(validations.Form.PassTooShort)
        await signInPage.fillPassInputAndLoseFocus(userCredentials.longPass)
        expect(await page.getInputValidationTextByInputName(enums.Input.Password)).equals(validations.Form.PassTooLong)

        await browser.refresh()

        await page.clickOnFormButton(enums.Button.SignIn)
        expect(await page.getInputValidationTextByInputName(enums.Input.Email)).equals(validations.Form.Required)
        expect(await page.getInputValidationTextByInputName(enums.Input.Password)).equals(validations.Form.Required)
    })

    it('Open register page from sign in page', async () => {
        await page.clickOnLink(enums.Link.SignUp)
        expect(await page.getPageHeaderTextForGuestAfterFormBtnIsVisible(enums.Button.Register)).equals(enums.Header.Register)
    })

    it('Open reset password page from sign in page', async () => {
        await page.clickOnLink(enums.Link.ResetPass)
        expect(await page.getPageHeaderTextForGuestAfterFormBtnIsVisible(enums.Button.SendRecoveryCode)).equals(enums.Header.ResetPass)
    })

    afterEach(async function() {
        await api.takeScreenshot(this)
    })

})