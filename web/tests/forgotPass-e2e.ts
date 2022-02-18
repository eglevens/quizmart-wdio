import * as forgotPassPage from '../pageObjects/forgotPass.page'
import * as page from '../pageObjects/page'
import * as userCredentials from '../utils/userCredentials'
import * as  Validations from '../utils/validations'
import * as enums from '../utils/enums'
import { expect } from 'chai'
import randomEmail = require('random-email')


describe('Password recovery from forgot password page', () => {

    beforeEach(async function(){
        await page.openForgotPassPage()
        await page.waitUntilFormButtonByTextIsClickable(enums.Button.SendRecoveryCode)
    })

    it('Attempt to reset pass with not registered email', async() => {
        await forgotPassPage.receiveRecoveryCodeWithEmail(randomEmail())
        await page.waitUntilFormButtonByTextIsClickable(enums.Button.SendRecoveryCode)
        expect (await forgotPassPage.getBackendValidationErrorText()).equals(Validations.Form.NoUserWithThisEmail)
    })

    it('Validation error with invalid email format and required email validation error', async () => {
        for (const invalidFormatEmail of userCredentials.invalidFormatEmails) {
            await forgotPassPage.receiveRecoveryCodeWithEmail(invalidFormatEmail)
            expect (await page.getFrontendInputValidationTextByInputName(enums.Input.Email)).equals(Validations.Form.InvalidEmail)
            await browser.refresh()  
        }
        await page.clickOnFormButton(enums.Button.SendRecoveryCode)
        expect (await page.getFrontendInputValidationTextByInputName(enums.Input.Email)).equals(Validations.Form.Required)
    })

    it('Validation error too short, too long and required recovery code after registered email submitted', async () => {
        await page.openForgotPassPageRecoveryCode()
        await page.waitUntilFormButtonByTextIsClickable(enums.Button.NextWithRecoveryCode)
        await forgotPassPage.fillRecoveryCode(userCredentials.shortRecoveryCode)
        expect (await page.getFrontendInputValidationTextByInputName(enums.Input.RecoveryCode)).equals(Validations.Form.RecoveryCodeTooShort)

        browser.refresh()
        await forgotPassPage.fillRecoveryCode(userCredentials.longRecoveryCode)
        expect (await page.getFrontendInputValidationTextByInputName(enums.Input.RecoveryCode)).equals(Validations.Form.RecoveryCodeTooLong)

        browser.refresh()
        await page.clickOnFormButton(enums.Button.NextWithRecoveryCode)
        expect (await page.getFrontendInputValidationTextByInputName(enums.Input.RecoveryCode)).equals(Validations.Form.Required)
    })

    it('Password too short, too long, repeat pass not matching and required inputs form validation error', async () => {
        await page.openForgotPassPageRecoveryCode()
        await forgotPassPage.fillRecoveryCode('1111111111')
        await page.waitUntilFormButtonByTextIsClickable(enums.Button.DonePasswordReset)
        await page.clickOnFormButton(enums.Button.DonePasswordReset)
        expect (await page.getFrontendInputValidationTextByInputName(enums.Input.Password)).equals(Validations.Form.Required)
        expect (await page.getFrontendInputValidationTextByInputName(enums.Input.RepeatPass)).equals(Validations.Form.Required)
        
        await forgotPassPage.fillPassInputsAndSubmit(userCredentials.shortPass, userCredentials.notMatchingRepeatPass)
        expect (await page.getFrontendInputValidationTextByInputName(enums.Input.Password)).equals(Validations.Form.PassTooShort)
        
        await forgotPassPage.fillPassInputsAndSubmit(userCredentials.longPass, userCredentials.notMatchingRepeatPass)
        expect (await page.getFrontendInputValidationTextByInputName(enums.Input.Password)).equals(Validations.Form.PassTooLong)
        expect (await page.getFrontendInputValidationTextByInputName(enums.Input.RepeatPass)).equals(Validations.Form.PasswordsMustMatch)
    })

    it('Attempt to submit incorrect recovery code with valid and matching passwords', async () => {
        await forgotPassPage.registeredEmailWithInvalidRecoveryCode()
        await page.waitUntilFormButtonByTextIsClickable(enums.Button.DonePasswordReset)
        expect (await forgotPassPage.getBackendValidationErrorText()).equals(Validations.Form.IncorrectRecoveryCode)
    })
    
    //does not work, email service is not implemented yet.
    // it('Success password reset', async () => {
    //     await forgotPassPage.registeredEmailWithSuccessRecoveryCode()
    //     await discoverPage.waitForSortButtonIsDisplayed(8000)
    //     expect (await page.getPageHeaderText()).equals(Enums.Header.Discover)
    // })

})