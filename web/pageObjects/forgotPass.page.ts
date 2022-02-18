import * as page from './page'
import * as enums from '../utils/enums'
import * as userCredentials from '../utils/userCredentials'

const backendFormValidationError = '//main //form/h3'


//----------------GET----------------

export async function getBackendValidationErrorText(): Promise<string> {
    return await page.getElementTextByLocator(backendFormValidationError)
}

//----------------ACTION----------------

export async function receiveRecoveryCodeWithEmail(email: string): Promise<void> {
    await page.fillFormInputWithValue(enums.Input.Email, email)
    await page.clickOnFormButton(enums.Button.SendRecoveryCode)
}

export async function fillRecoveryCode(recoveryCode: string): Promise<void> {
    await page.fillFormInputWithValue(enums.Input.RecoveryCode, recoveryCode)
    await page.clickOnFormButton(enums.Button.NextWithRecoveryCode)
}

export async function registeredEmailWithInvalidRecoveryCode(): Promise<void> {
    await receiveRecoveryCodeWithEmail(userCredentials.userForgotPass.email)
    await page.waitUntilFormButtonByTextIsClickable(enums.Button.NextWithRecoveryCode, 4000)
    await fillRecoveryCode('1111111111')
    await fillPassInputsAndSubmit(userCredentials.userForgotPass.newPass, userCredentials.userForgotPass.newPass)
}

export async function fillPassInputsAndSubmit(pass: string, repeatPass: string): Promise<void> {
    await page.fillFormInputWithValue(enums.Input.Password, pass)
    await page.fillFormInputWithValue(enums.Input.RepeatPass, repeatPass)
    await page.clickOnFormButton(enums.Button.DonePasswordReset)
}

export async function registeredEmailWithSuccessRecoveryCode(): Promise<void> {
    await receiveRecoveryCodeWithEmail(userCredentials.userForgotPass.email)
    //await fillRecoveryCode()
    await page.waitUntilFormButtonByTextIsClickable(enums.Button.DonePasswordReset)
    await fillPassInputsAndSubmit(userCredentials.userForgotPass.newPass, userCredentials.userForgotPass.newPass)
}