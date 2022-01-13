import * as forgotPassPage from "../pageObjects/forgotPass.page"
import { expect } from 'chai'


const email = 'eglvns@telesoftas.com'
const unregistredEmail = 'eglvns+unregistered@telesoftas.com'
const invalidFormatEmail = 'eglvns@telesoftascom'
const recoveryCodeTooShort = '12345'
const recoveryCodeIncorrect = '1111111111'


describe('Password recovery from forgot password page', () => {

    beforeEach(function(){
        forgotPassPage.openForgotPassPage()
    })

    it('Attempt to reset pass with not registered email', async() => {
        await forgotPassPage.receiveRecoveryCodeWithEmail(unregistredEmail)
        
    })

    it('Validation error with invalid email format', async () => {
        await forgotPassPage.receiveRecoveryCodeWithEmail(invalidFormatEmail)
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

})