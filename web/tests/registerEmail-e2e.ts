import * as registerPage from '../pageObjects/register'
import * as userCredentials from '../utils/userCredentials'
import { getSignInPageTitleText } from '../pageObjects/signIn.page'
import { openRegisterPage } from '../pageObjects/page'
import { FormValidationMessage } from '../utils/formValidationMessages'
import { HeaderText } from '../utils/enums'
import { expect } from 'chai'
import { waitForUserProfileImageInHeader } from '../pageObjects/header.element'
import { getDiscoverPageTitleText } from '../pageObjects/discover.page'
const randomEmail = require('random-email')


describe('Register with email from register page', () => {

    beforeEach(async function () {
        await openRegisterPage()
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

    it('Attempt to register with already registered email', async () => {
        await registerPage.registerWithEmail(userCredentials.email, userCredentials.pass, userCredentials.pass)
        await registerPage.waitForErrorInViewport()
        expect(await registerPage.getAlreadyRegisteredUserErrorText()).equals(FormValidationMessage.alreadyRegisteredUserErrorText)
    })

    it('Validation error with invalid email format, too short password and not matching repeat password', async () => {

    })

    it('Validation error with empty email & passwords', async () => {
        await registerPage.clickRegisterBtn()
        expect(await registerPage.getEmailValidationErrorText()).equals(FormValidationMessage.requiredValidationErrorText)
        expect(await registerPage.getPassValidationErrorText()).equals(FormValidationMessage.requiredValidationErrorText)
        expect(await registerPage.getPassRepeatValidationErrorText()).equals(FormValidationMessage.requiredValidationErrorText)
    })

    it('Open sign in page from register page', async () => {
        await registerPage.clickSignInLink()
        expect(await getSignInPageTitleText()).equals(HeaderText.signIn)
    })

})