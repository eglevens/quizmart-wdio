import * as forgotPassPage from "../pageObjects/forgotPass.page"
import { openForgotPassPage } from "../pageObjects/page"
import { invalidFormatEmails } from '../utils/userCredentials'
import { FormValidationMessage } from "../utils/formValidationMessages"
import { expect } from 'chai'
const randomEmail = require('random-email')


describe('Password recovery from forgot password page', () => {

    beforeEach(function(){
        openForgotPassPage()
    })

    it('Attempt to reset pass with not registered email', async() => {
        await forgotPassPage.receiveRecoveryCodeWithEmail(randomEmail)
        
    })

    it('Validation error with invalid email format', async () => {
        for (const invalidFormatEmail of invalidFormatEmails) {
            await forgotPassPage.fillEmailInputAndLoseFocus(invalidFormatEmail)
            expect (await forgotPassPage.getEmailValidationErrorText()).equals(FormValidationMessage.emailValidationErrorText)
            await browser.refresh()  
        }
    })

    it('Validation error with empty email', async () => {
        await forgotPassPage.clickSendRecoveryCodeBtn()
    })

    it('Validation error with empty recovery code after registered email submitted', async () => {
        await forgotPassPage.clickNextBtn(email)
    })

    it('Validation error with too short recovery code after registered email submitted, ', async () => {
        await forgotPassPage.clickNextWithRecoveryCode(email, recoveryCodeTooShort)
    })

    it('Attempt to submit incorrect recovery code', async () => {
        await forgotPassPage.clickNextWithRecoveryCode(email, recoveryCodeIncorrect)

    })

    it('Attempt to submit incorrect recovery code', async () => {
        await forgotPassPage.clickNextWithRecoveryCode(email, recoveryCodeIncorrect)

    })

})