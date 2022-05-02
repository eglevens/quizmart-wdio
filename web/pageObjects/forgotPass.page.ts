import * as page from './page'
import * as enums from '../utils/enums'
import * as mailApp from '../utils/mailApp'
import * as defaultCredentials from '../../userCredentials.json'

const backendFormValidationError = '//main //form/h3'


//----------------GET----------------

export async function getBackendValidationErrorTextAfterBtnIsClickable(btn: string): Promise<string> {
    await page.waitUntilFormButtonByTextIsClickable(btn)
    return await page.getElementTextByLocator(backendFormValidationError)
}

//----------------ACTION----------------

export async function receiveRecoveryCodeWithEmail(email?: string): Promise<void> {
    await page.fillFormInputWithValue(enums.Input.Email, email || defaultCredentials.email)
    await page.clickOnFormButton(enums.Button.SendRecoveryCode)
}

export async function fillRecoveryCode(recoveryCode: string): Promise<void> {
    await page.waitUntilFormButtonByTextIsClickable(enums.Button.NextWithRecoveryCode)
    await page.fillFormInputWithValue(enums.Input.RecoveryCode, recoveryCode)
    await page.clickOnFormButton(enums.Button.NextWithRecoveryCode)
}

export async function registeredEmailWithInvalidRecoveryCode(): Promise<void> {
    await receiveRecoveryCodeWithEmail(defaultCredentials.resetPasswordEmail)
    await page.waitUntilFormButtonByTextIsClickable(enums.Button.NextWithRecoveryCode, 4000)
    await fillRecoveryCode('1111111111')
    await fillPassInputsAndSubmit()
}

export async function fillPassInputsAndSubmit(pass?: string, repeatPass?: string): Promise<void> {
    await page.fillFormInputWithValue(enums.Input.Password, pass || defaultCredentials.resetPasswordPass)
    await page.fillFormInputWithValue(enums.Input.RepeatPass, repeatPass || defaultCredentials.resetPasswordPass)
    await page.clickOnFormButton(enums.Button.DonePasswordReset)
}

export async function registeredEmailWithSuccessRecoveryCode(): Promise<void> {
    await receiveRecoveryCodeWithEmail(defaultCredentials.resetPasswordEmail)
    const verificationCode = await mailApp.getTempPasswordFromEmail()
    await fillRecoveryCode(verificationCode)
    await page.waitUntilFormButtonByTextIsClickable(enums.Button.DonePasswordReset)
    await fillPassInputsAndSubmit(defaultCredentials.resetPasswordPass, defaultCredentials.resetPasswordPass)
}