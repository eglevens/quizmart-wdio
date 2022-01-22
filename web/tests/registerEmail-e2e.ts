import * as registerPage from '../pageObjects/register'
import * as userCredentials from '../utils/userCredentials'
import { getSignInPageTitleText, waitForSignInFormBtn } from '../pageObjects/signIn.page'
import { openRegisterPage, returnUrl} from '../pageObjects/page'
import { FormValidationMessage } from '../utils/formValidationMessages'
import { HeaderText } from '../utils/enums'
import { expect } from 'chai'
import { waitForUserProfileImageInHeader } from '../pageObjects/header.element'
import { getDiscoverPageTitleText } from '../pageObjects/discover.page'
import { waitForPrivacyPolicyPageTitleText } from '../pageObjects/privacyPolicy.page'
const randomEmail = require('random-email')

const passRepeatMustMatchValidationErrorText = 'Passwords must match'
const notMatchingRepeatPass = 'asd'


describe('Register with email from register page', () => {

    beforeEach(async function () {
        await openRegisterPage()
        await registerPage.waitForRegisterBtnIsClickable()
    })

    it('Attempt to register with already registered email', async () => {
        await registerPage.registerWithEmail(userCredentials.email, userCredentials.pass, userCredentials.pass)
        await registerPage.waitForRegisterBtnIsClickable() 
        expect(await registerPage.getAlreadyRegisteredUserErrorText()).equals(FormValidationMessage.alreadyRegisteredUserErrorText)
    })

    it('Success register without newsletter', async () => {
        await registerPage.registerWithEmail(randomEmail(), userCredentials.pass, userCredentials.pass)
        await waitForUserProfileImageInHeader()
        expect (await getDiscoverPageTitleText()).equals(HeaderText.discover)
    })

    it('Success register with newsletter', async () => {
        await registerPage.registerWithEmailAndNewsletterSubscription(randomEmail(), userCredentials.pass, userCredentials.pass)
        await waitForUserProfileImageInHeader()
        expect (await getDiscoverPageTitleText()).equals(HeaderText.discover)
    })

    it('Validation error with invalid email format', async () => {
        for (const invalidFormatEmail of userCredentials.invalidFormatEmails) {
            await registerPage.fillEmailInputAndLoseFocus(invalidFormatEmail)
            expect(await registerPage.getEmailValidationErrorText()).equals(FormValidationMessage.emailValidationErrorText)
            await browser.refresh()  
        }
    })

    it('Validation error with too short, too long password and not matching repeat password', async () => {
        await registerPage.fillPassInputsAndLoseFocus(userCredentials.shortPass, notMatchingRepeatPass)
        expect (await registerPage.getPassValidationErrorText()).equals(FormValidationMessage.passTooShortValidationErrorText)
        expect (await registerPage.getPassRepeatValidationErrorText()).equals(passRepeatMustMatchValidationErrorText)
        browser.refresh()
        await registerPage.fillPassInputsAndLoseFocus(userCredentials.longPass, notMatchingRepeatPass)
        expect (await registerPage.getPassValidationErrorText()).equals(FormValidationMessage.passTooLongValidationErrorText)
        expect (await registerPage.getPassRepeatValidationErrorText()).equals(passRepeatMustMatchValidationErrorText)
        
    })

    it('Validation error with empty email & passwords', async () => {
        await registerPage.clickRegisterBtn()
        expect(await registerPage.getEmailValidationErrorText()).equals(FormValidationMessage.requiredValidationErrorText)
        expect(await registerPage.getPassValidationErrorText()).equals(FormValidationMessage.requiredValidationErrorText)
        expect(await registerPage.getPassRepeatValidationErrorText()).equals(FormValidationMessage.requiredValidationErrorText)
    })

    it('Open sign in page from register page', async () => {
        await registerPage.clickSignInLink()
        await waitForSignInFormBtn()
        expect(await getSignInPageTitleText()).equals(HeaderText.signIn)
    })

    it('Open privacy policy page from register page', async () => {
        await registerPage.clickNewsletterPrivacyPolicyLink()
        await waitForPrivacyPolicyPageTitleText()
        expect(await returnUrl()).equals('https://staging.quizmart.io/privacy-policy')
    })

})