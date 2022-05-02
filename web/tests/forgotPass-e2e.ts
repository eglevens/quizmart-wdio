import * as forgotPassPage from '../pageObjects/forgotPass.page'
import * as page from '../pageObjects/page'
import * as invalidUserCredentials from '../utils/invalidUserCredentials'
import * as validations from '../utils/validations'
import * as enums from '../utils/enums'
import * as api from '../utils/api'
import { expect } from 'chai'
import * as mailApp from '../utils/mailApp'


describe('Password recovery from forgot password page', () => {

    beforeEach(async function(){
        await page.openForgotPassPage()
    })

    it('Attempt to reset pass with not registered email', async() => {
        await forgotPassPage.receiveRecoveryCodeWithEmail(`${mailApp.namespace}.${mailApp.tag}${mailApp.testMail}`)
        expect (await forgotPassPage.getBackendValidationErrorTextAfterBtnIsClickable(enums.Button.SendRecoveryCode)).equals(validations.Form.NoUserWithThisEmail)
    })

    it('Validation error with invalid email format and required email validation error', async () => {
        for (const invalidFormatEmail of invalidUserCredentials.invalidFormatEmails) {
            await forgotPassPage.receiveRecoveryCodeWithEmail(invalidFormatEmail)
            expect (await page.getInputValidationTextByInputName(enums.Input.Email)).equals(validations.Form.InvalidEmail)
            await browser.refresh()  
        }
        await page.clickOnFormButton(enums.Button.SendRecoveryCode)
        expect (await page.getInputValidationTextByInputName(enums.Input.Email)).equals(validations.Form.Required)
    })

    it('Validation error too short, too long and required recovery code after registered email submitted', async () => {
        await page.openForgotPassPageRecoveryCode()
        await forgotPassPage.fillRecoveryCode(invalidUserCredentials.shortRecoveryCode)
        expect (await page.getInputValidationTextByInputName(enums.Input.RecoveryCode)).equals(validations.Form.RecoveryCodeTooShort)

        await browser.refresh()
        await forgotPassPage.fillRecoveryCode(invalidUserCredentials.longRecoveryCode)
        expect (await page.getInputValidationTextByInputName(enums.Input.RecoveryCode)).equals(validations.Form.RecoveryCodeTooLong)

        await browser.refresh()
        await page.clickOnFormButton(enums.Button.NextWithRecoveryCode)
        expect (await page.getInputValidationTextByInputName(enums.Input.RecoveryCode)).equals(validations.Form.Required)
    })

    it('Password too short, too long, repeat pass not matching and required inputs form validation error', async () => {
        await page.openForgotPassPageRecoveryCode()
        await forgotPassPage.fillRecoveryCode('1111111111')
        await page.clickOnFormButton(enums.Button.DonePasswordReset)
        expect (await page.getInputValidationTextByInputName(enums.Input.Password)).equals(validations.Form.Required)
        expect (await page.getInputValidationTextByInputName(enums.Input.RepeatPass)).equals(validations.Form.Required)
        
        await forgotPassPage.fillPassInputsAndSubmit(invalidUserCredentials.shortPass, invalidUserCredentials.notMatchingRepeatPass)
        expect (await page.getInputValidationTextByInputName(enums.Input.Password)).equals(validations.Form.PassTooShort)
        
        await forgotPassPage.fillPassInputsAndSubmit(invalidUserCredentials.longPass, invalidUserCredentials.notMatchingRepeatPass)
        expect (await page.getInputValidationTextByInputName(enums.Input.Password)).equals(validations.Form.PassTooLong)
        expect (await page.getInputValidationTextByInputName(enums.Input.RepeatPass)).equals(validations.Form.PasswordsMustMatch)
    })

    it('Attempt to submit incorrect recovery code with valid and matching passwords', async () => {
        await forgotPassPage.registeredEmailWithInvalidRecoveryCode()
        expect (await forgotPassPage.getBackendValidationErrorTextAfterBtnIsClickable(enums.Button.DonePasswordReset)).equals(validations.Form.IncorrectRecoveryCode)
    })
    
    it('Success password reset', async () => {
        await forgotPassPage.registeredEmailWithSuccessRecoveryCode()
        await page.getPageHeaderTextAfterLogin()
        expect (await page.getPageHeaderText()).equals(enums.Header.Discover)
    })

    afterEach(async function() {
        await api.takeScreenshot(this)
    })

})