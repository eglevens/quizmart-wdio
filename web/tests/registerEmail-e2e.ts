import * as registerPage from '../pageObjects/register.page'
import * as userCredentials from '../utils/userCredentials'
import * as page from '../pageObjects/page'
import * as discoverPage from '../pageObjects/discover.page'
import * as privacyPolicyPage from '../pageObjects/privacyPolicy.page'
import * as Enums from '../utils/enums'
import { expect } from 'chai'
import * as Validations from '../utils/validations'
import randomEmail = require('random-email')

const passRepeatMustMatchValidationErrorText = 'Passwords must match'
const notMatchingRepeatPass = 'asd'


describe('Register with email from register page', () => {

    beforeEach(async function () {
        await page.openRegisterPage()
        await page.waitUntilFormButtonByTextIsClickable(Enums.Button.Register)
    })

    it('Attempt to register with already registered email', async () => {
        await registerPage.registerWithEmail(userCredentials.user1.email, userCredentials.user1.pass, userCredentials.user1.pass)
        await page.waitUntilFormButtonByTextIsClickable(Enums.Button.Register)
        expect (await page.getBackendFormValidationError()).equals(Validations.Form.AlreadyRegisteredEmail)
    })

    it('Success register without newsletter', async () => {
        await registerPage.registerWithEmail(randomEmail(), userCredentials.user1.pass, userCredentials.user1.pass)
        await discoverPage.waitForSortButtonIsDisplayed(8000)
        expect (await page.getPageHeaderText()).equals(Enums.Header.Discover)
    })

    it('Success register with newsletter', async () => {
        await registerPage.registerWithEmailAndNewsletterSubscription(randomEmail(), userCredentials.user1.pass, userCredentials.user1.pass)
        await discoverPage.waitForSortButtonIsDisplayed(8000)
        expect (await page.getPageHeaderText()).equals(Enums.Header.Discover)
    })

    it('Validation error with invalid email format', async () => {
        for (const invalidFormatEmail of userCredentials.invalidFormatEmails) {
            await registerPage.fillEmailInputAndLoseFocus(invalidFormatEmail)
            expect (await page.getFrontendInputValidationTextByInputName(Enums.Input.Email)).equals(Validations.Form.InvalidEmail)
            await browser.refresh()  
        }
    })

    it('Validation error with too short, too long password and not matching repeat password', async () => {
        await registerPage.fillPassInputsAndLoseFocus(userCredentials.shortPass, notMatchingRepeatPass)
        expect (await page.getFrontendInputValidationTextByInputName(Enums.Input.Password)).equals(Validations.Form.PassTooShort)
        expect (await page.getFrontendInputValidationTextByInputName(Enums.Input.RepeatPass)).equals(passRepeatMustMatchValidationErrorText)
        
        await registerPage.fillPassInputsAndLoseFocus(userCredentials.longPass, notMatchingRepeatPass)
        expect (await page.getFrontendInputValidationTextByInputName(Enums.Input.Password)).equals(Validations.Form.PassTooLong)
        expect (await page.getFrontendInputValidationTextByInputName(Enums.Input.RepeatPass)).equals(passRepeatMustMatchValidationErrorText)
    })

    it('Validation error with empty email & passwords', async () => {
        await page.clickOnFormButton(Enums.Button.Register)
        expect (await page.getFrontendInputValidationTextByInputName(Enums.Input.Email)).equals(Validations.Form.Required)
        expect (await page.getFrontendInputValidationTextByInputName(Enums.Input.Password)).equals(Validations.Form.Required)
        expect (await page.getFrontendInputValidationTextByInputName(Enums.Input.RepeatPass)).equals(Validations.Form.Required)
    })

    it('Open sign in page from register page', async () => {
        await page.clickOnLink(Enums.Link.SignIn)
        await page.waitUntilFormButtonByTextIsVisibleInViewport(Enums.Button.SignIn)
        expect (await page.getPageHeaderText()).equals(Enums.Header.SignIn)
    })

    it('Open privacy policy page from register page', async () => {
        await registerPage.clickNewsletterPrivacyPolicyLink()
        await privacyPolicyPage.waitForCloseBtnIsDisplayed(3000)
        expect (await page.getPageHeaderText()).equals(Enums.Header.PrivacyPolicy)
    })

})