import * as forgotPassPage from '../pageObjects/forgotPass.page'
import * as page from '../pageObjects/page'
import * as userCredentials from '../utils/userCredentials'
import * as  validations from '../utils/validations'
import * as enums from '../utils/enums'
import * as api from '../utils/api'
import { expect } from 'chai'
import randomEmail = require('random-email')


describe('Password recovery from forgot password page', () => {

    beforeEach(async function(){
        await page.openForgotPassPage()
    })

    it('Attempt to reset pass with not registered email', async() => {
        await forgotPassPage.receiveRecoveryCodeWithEmail(randomEmail())
        expect (await forgotPassPage.getBackendValidationErrorTextAfterBtnIsClickable(enums.Button.SendRecoveryCode)).equals(validations.Form.NoUserWithThisEmail)
    })

    it('Validation error with invalid email format and required email validation error', async () => {
        for (const invalidFormatEmail of userCredentials.invalidFormatEmails) {
            await forgotPassPage.receiveRecoveryCodeWithEmail(invalidFormatEmail)
            expect (await page.getInputValidationTextByInputName(enums.Input.Email)).equals(validations.Form.InvalidEmail)
            await browser.refresh()  
        }
        await page.clickOnFormButton(enums.Button.SendRecoveryCode)
        expect (await page.getInputValidationTextByInputName(enums.Input.Email)).equals(validations.Form.Required)
    })

    it('Validation error too short, too long and required recovery code after registered email submitted', async () => {
        await page.openForgotPassPageRecoveryCode()
        await forgotPassPage.fillRecoveryCode(userCredentials.shortRecoveryCode)
        expect (await page.getInputValidationTextByInputName(enums.Input.RecoveryCode)).equals(validations.Form.RecoveryCodeTooShort)

        await browser.refresh()
        await forgotPassPage.fillRecoveryCode(userCredentials.longRecoveryCode)
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
        
        await forgotPassPage.fillPassInputsAndSubmit(userCredentials.shortPass, userCredentials.notMatchingRepeatPass)
        expect (await page.getInputValidationTextByInputName(enums.Input.Password)).equals(validations.Form.PassTooShort)
        
        await forgotPassPage.fillPassInputsAndSubmit(userCredentials.longPass, userCredentials.notMatchingRepeatPass)
        expect (await page.getInputValidationTextByInputName(enums.Input.Password)).equals(validations.Form.PassTooLong)
        expect (await page.getInputValidationTextByInputName(enums.Input.RepeatPass)).equals(validations.Form.PasswordsMustMatch)
    })

    it('Attempt to submit incorrect recovery code with valid and matching passwords', async () => {
        await forgotPassPage.registeredEmailWithInvalidRecoveryCode()
        expect (await forgotPassPage.getBackendValidationErrorTextAfterBtnIsClickable(enums.Button.DonePasswordReset)).equals(validations.Form.IncorrectRecoveryCode)
    })
    
    //does not work, email service is not implemented yet.
    // it('Success password reset', async () => {
    //     await forgotPassPage.registeredEmailWithSuccessRecoveryCode()
    //     await discoverPage.waitForSortButtonIsDisplayed(8000)
    //     expect (await page.getPageHeaderText()).equals(Enums.Header.Discover)
    // })


    afterEach(async function() {
        await api.takeScreenshot(this)
    })

})