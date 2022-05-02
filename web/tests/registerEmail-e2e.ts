import * as registerPage from '../pageObjects/register.page'
import * as userCredentials from '../utils/userCredentials'
import * as page from '../pageObjects/page'
import * as privacyPolicyPage from '../pageObjects/privacyPolicy.page'
import * as enums from '../utils/enums'
import * as api from '../utils/api'
import { expect } from 'chai'
import * as validations from '../utils/validations'
import * as mailApp from '../utils/mailApp'

describe('Register with email from register page', () => {

    beforeEach(async function () {
        await page.openRegisterPage()
    })

    it('Attempt to register with already registered email', async () => {
        await registerPage.registerWithEmail()
        expect(await registerPage.getFormValidation()).equals(validations.Form.AlreadyRegisteredEmail)
    })

    it('Success register without newsletter', async () => {
        await registerPage.registerWithEmail(`${mailApp.namespace}.${mailApp.tag}${mailApp.testMail}`)
        await page.waitUntilSortButtonIsDisplayed(8000)
        expect(await page.getPageHeaderTextAfterLogin()).equals(enums.Header.Discover)
        expect(await api.isUserSubscribedToNewsletter()).to.be.false
        expect(await page.waitUntilButtonByTextIsVisibleInViewport(enums.Button.SendVerificationEmail))
        await api.deleteAccount()
    })

    it('Success register with newsletter', async () => {
        await registerPage.registerWithEmailAndNewsletterSubscription(`${mailApp.namespace}.${mailApp.tag}${mailApp.testMail}`)
        await page.waitUntilSortButtonIsDisplayed(8000)
        expect(await page.getPageHeaderTextAfterLogin()).equals(enums.Header.Discover)
        expect(await api.isUserSubscribedToNewsletter()).to.be.true
        expect(await page.waitUntilButtonByTextIsVisibleInViewport(enums.Button.SendVerificationEmail))
        await api.deleteAccount()
    })

    it('Validation error with invalid email format', async () => {
        for (const invalidFormatEmail of userCredentials.invalidFormatEmails) {
            await registerPage.fillEmailInputAndLoseFocus(invalidFormatEmail)
            expect(await page.getInputValidationTextByInputName(enums.Input.Email)).equals(validations.Form.InvalidEmail)
            await browser.refresh()
        }
    })

    it('Validation error with too short, too long password and not matching repeat password and inputs required', async () => {
        await registerPage.fillPassInputs(userCredentials.shortPass, userCredentials.notMatchingRepeatPass)
        expect(await page.getInputValidationTextByInputName(enums.Input.Password)).equals(validations.Form.PassTooShort)
        expect(await page.getInputValidationTextByInputName(enums.Input.RepeatPass)).equals(validations.Form.PasswordsMustMatch)

        await registerPage.fillPassInputs(userCredentials.longPass, userCredentials.notMatchingRepeatPass)
        expect(await page.getInputValidationTextByInputName(enums.Input.Password)).equals(validations.Form.PassTooLong)
        expect(await page.getInputValidationTextByInputName(enums.Input.RepeatPass)).equals(validations.Form.PasswordsMustMatch)

        await browser.refresh()

        await page.clickOnFormButton(enums.Button.Register)
        expect(await page.getInputValidationTextByInputName(enums.Input.Email)).equals(validations.Form.Required)
        expect(await page.getInputValidationTextByInputName(enums.Input.Password)).equals(validations.Form.Required)
        expect(await page.getInputValidationTextByInputName(enums.Input.RepeatPass)).equals(validations.Form.Required)
    })

    it('Open sign in page from register page', async () => {
        await page.clickOnLink(enums.Link.SignIn)
        expect(await page.getPageHeaderTextForGuestAfterFormBtnIsVisible(enums.Button.SignIn)).equals(enums.Header.SignIn)
    })

    it('Open privacy policy page from register page', async () => {
        await registerPage.clickNewsletterPrivacyPolicyLink()
        expect(await privacyPolicyPage.getPageHeaderText()).equals(enums.Header.PrivacyPolicy)
    })

    it('Email confirmation after registration', async () => {
        await registerPage.registerWithEmail(`${mailApp.namespace}.${mailApp.tag}${mailApp.testMail}`)
        const confirmationLink = await mailApp.getVerificationLinkFromEmail()
        await browser.url(confirmationLink)
        await page.clickOnButton(enums.Button.ConfirmEmail)
        await page.waitUntilButtonByTextIsNotVisibleInViewport(enums.Button.ConfirmEmail)
        const emailConfirmationText = await registerPage.getEmailConfirmationText()
        expect(emailConfirmationText).contains('Your account has been confirmed successfully!')
        await page.openDiscover()
        expect(await api.isUserEmailVerified()).to.be.true
        await api.deleteAccount()
    })

    afterEach(async function () {
        await api.takeScreenshot(this)
    })
})