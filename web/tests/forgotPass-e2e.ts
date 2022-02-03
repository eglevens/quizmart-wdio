import * as forgotPassPage from "../pageObjects/forgotPass.page"
import { openForgotPassPage, openForgotPassPageRecoveryCode, openForgotPassCreateNewPass } from "../pageObjects/page"
import { invalidFormatEmails, user1, shortRecoveryCode, longRecoveryCode} from '../utils/userCredentials'
import { FormValidationMessage } from "../utils/formValidationMessages"
import { expect } from 'chai'
const randomEmail = require('random-email')


describe('Password recovery from forgot password page', () => {

    beforeEach(async function(){
        await openForgotPassPage()
        await forgotPassPage.waitForSendRecoveryCodeBtnIsClickable()
    })

    it('Attempt to reset pass with not registered email', async() => {
        await forgotPassPage.receiveRecoveryCodeWithEmail(randomEmail)
        await forgotPassPage.waitForSendRecoveryCodeBtnIsClickable()
        expect (await forgotPassPage.getNoUserWithThisEmailErrorText()).equals(FormValidationMessage.noUserWithThisEmailErrorText)

    })

    it('Validation error with invalid email format and required email validation error', async () => {
        for (const invalidFormatEmail of invalidFormatEmails) {
            await forgotPassPage.fillEmailInputAndLoseFocus(invalidFormatEmail)
            expect (await forgotPassPage.getEmailValidationErrorText()).equals(FormValidationMessage.emailValidationErrorText)
            await browser.refresh()  
        }
        await forgotPassPage.clickSendRecoveryCodeBtn()
        expect (await forgotPassPage.getEmailValidationErrorText()).equals(FormValidationMessage.requiredValidationErrorText)
    })

    //fixed.
    it('Validation error too short, too long and required recovery code after registered email submitted', async () => {
        await openForgotPassPageRecoveryCode()
        await forgotPassPage.waitForNextBtnIsClickable()
        await forgotPassPage.fillRecoveryCodeAndLoseFocus(shortRecoveryCode)
        expect (await forgotPassPage.getRecoveryCodeValidationErrorText()).equals(FormValidationMessage.recoveryCodeTooShortValidationErrorText)
        browser.refresh()
        await forgotPassPage.fillRecoveryCodeAndLoseFocus(longRecoveryCode)
        expect (await forgotPassPage.getRecoveryCodeValidationErrorText()).equals(FormValidationMessage.recoveryCodeTooLongValidationErrorText)
        browser.refresh()
        await forgotPassPage.clickRecoveryCodeInputAndLoseFocus()
        expect (await forgotPassPage.getRecoveryCodeValidationErrorText()).equals(FormValidationMessage.requiredValidationErrorText)
    })

    it('Password form validation error', async () => {
        await openForgotPassCreateNewPass()
        await forgotPassPage.waitForDoneBtnIsClickable()

    })

    it('Attempt to submit incorrect recovery code', async () => {
        await forgotPassPage.clickNextWithRecoveryCode(email, recoveryCodeIncorrect)

    })

})