import * as registerPage from '../pageObjects/register'
import * as signInPage from '../pageObjects/signIn.page'
import * as userCredentials from '../utils/userCredentials'
import { openRegisterPage } from '../pageObjects/page'
import { FormValidationMessage } from '../utils/formValidationMessages'
import { HeaderText } from '../utils/enums'
import { expect } from 'chai'


describe('Register with email from register page', () => {

    beforeEach(async function () {
        await openRegisterPage()
    })

    it('Success register without newsletter', async () => {

    })

    it('Success register with newsletter', async () => {

    })

    it('Attempt to register with already registered email', async () => {
        await registerPage.registerWithEmail(userCredentials.email, userCredentials.pass, userCredentials.pass)
        await registerPage.waitForError()
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
        expect(await signInPage.getSignInPageTitleText()).equals(HeaderText.signIn)
    })

})