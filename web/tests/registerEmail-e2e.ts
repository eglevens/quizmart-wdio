import * as registerPage from '../pageObjects/register.page'
import * as userCredentials from '../utils/userCredentials'
import * as page from '../pageObjects/page'
import * as discoverPage from '../pageObjects/discover.page'
import * as privacyPolicyPage from '../pageObjects/privacyPolicy.page'
import * as enums from '../utils/enums'
import * as api from '../utils/quizmartApi'
import { expect } from 'chai'
import * as validations from '../utils/validations'
import * as mailApp from '../utils/mailApp'
import { openMyCreatedQuizzes } from '../pageObjects/myQuizz.page'

describe('Register with email from register page', () => {

    beforeEach(async function () {
        await page.openRegisterPage()
    })

    it('Attempt to register with already registered email', async () => {
        await registerPage.registerWithEmail(userCredentials.user1.email, userCredentials.user1.pass, userCredentials.user1.pass)
        expect (await registerPage.getFormValidation()).equals(validations.Form.AlreadyRegisteredEmail)
    })

    it('Success register without newsletter', async () => {
        await registerPage.registerWithEmail(`${mailApp.namespace}.${mailApp.tag}${mailApp.testMail}`, userCredentials.user1.pass, userCredentials.user1.pass)
        await discoverPage.waitForSortButtonIsDisplayed(8000)
        expect (await page.getPageHeaderTextAfterLogin()).equals(enums.Header.Discover)
        expect (await api.isUserSubscribedToNewsletter()).to.be.false
        await api.deleteAccount()
    })
    
    it('Success register with newsletter', async () => {
        await registerPage.registerWithEmailAndNewsletterSubscription(`${mailApp.namespace}.${mailApp.tag}${mailApp.testMail}`, userCredentials.user1.pass, userCredentials.user1.pass)
        await discoverPage.waitForSortButtonIsDisplayed(8000)
        expect (await page.getPageHeaderTextAfterLogin()).equals(enums.Header.Discover)
        expect (await api.isUserSubscribedToNewsletter()).to.be.true
        await api.deleteAccount()
    })

    it('Validation error with invalid email format', async () => {
        for (const invalidFormatEmail of userCredentials.invalidFormatEmails) {
            await registerPage.fillEmailInputAndLoseFocus(invalidFormatEmail)
            expect (await page.getInputValidationTextByInputName(enums.Input.Email)).equals(validations.Form.InvalidEmail)
            await browser.refresh()  
        }
    })

    it('Validation error with too short, too long password and not matching repeat password and inputs required', async () => {
        await registerPage.fillPassInputs(userCredentials.shortPass, userCredentials.notMatchingRepeatPass)
        expect (await page.getInputValidationTextByInputName(enums.Input.Password)).equals(validations.Form.PassTooShort)
        expect (await page.getInputValidationTextByInputName(enums.Input.RepeatPass)).equals(validations.Form.PasswordsMustMatch)
        
        await registerPage.fillPassInputs(userCredentials.longPass, userCredentials.notMatchingRepeatPass)
        expect (await page.getInputValidationTextByInputName(enums.Input.Password)).equals(validations.Form.PassTooLong)
        expect (await page.getInputValidationTextByInputName(enums.Input.RepeatPass)).equals(validations.Form.PasswordsMustMatch)
        
        await browser.refresh()

        await page.clickOnFormButton(enums.Button.Register)
        expect (await page.getInputValidationTextByInputName(enums.Input.Email)).equals(validations.Form.Required)
        expect (await page.getInputValidationTextByInputName(enums.Input.Password)).equals(validations.Form.Required)
        expect (await page.getInputValidationTextByInputName(enums.Input.RepeatPass)).equals(validations.Form.Required)
    })

    it('Open sign in page from register page', async () => {
        await page.clickOnLink(enums.Link.SignIn)
        expect (await page.getPageHeaderTextForGuestAfterBtnIsVisible(enums.Button.SignIn)).equals(enums.Header.SignIn)
    })

    it('Open privacy policy page from register page', async () => {
        await registerPage.clickNewsletterPrivacyPolicyLink()
        expect (await privacyPolicyPage.getPageHeaderText()).equals(enums.Header.PrivacyPolicy)
    })


    it.only('Email confirmation after registration', async () => {
        await registerPage.registerWithEmail(`${mailApp.namespace}.${mailApp.tag}${mailApp.testMail}`, userCredentials.user1.pass, userCredentials.user1.pass)
        const confirmationLink = await mailApp.getVerificationLinkFromEmail(mailApp.tag)
        await browser.url(confirmationLink)
        await browser.pause(5000)
        await page.clickOnButton(enums.Button.ConfirmEmail)
        //Dont know how to take an element from confirmation screen, so waiting for button to be not visible. for now
        await page.waitUntilButtonByTextIsNotVisibleInViewport(enums.Button.ConfirmEmail)
        //open quizmart page to get token for deleting acc
        await page.openCreatePage()
        await browser.pause(2000)
        await api.deleteAccount()
    })

})