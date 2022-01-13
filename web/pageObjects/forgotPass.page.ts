import * as page from './page'


const resetPasswordPageTitle = '//h1[text()="Reset your password"]'

const emailInput = '//input[@placeholder="Enter your email" and @name="email"]'
const recoveryCodeInput = '//input[@name="recoveryCode"]'

const sendRecoveryCodeBtn = '//button[text()="Send recovery code"]'
const nextBtn = '//button[text()="Next"]'

const noUserwithThisEmailValidationError = '//h3[text()="There is no user with this email address"]'
const emailFormatValidationError = '//h3[text()="Must be valid email"]'
const emailRequiredValidationError = '//h3[text()="Required"]'
const recoveryCodeTooShortValidationError = '//h3[text()="Recovery code must be at least 10 characters"]'
const recoveryCodeTooLongValidationError = '//h3[text()="Recovery code must be at most 20 characters"]'


export async function openForgotPassPage(): Promise<void> {
    await browser.url('reset-password/')
}

export async function getForgotPassPageTitle(): Promise<boolean> {
    return await page.elementPresentByLocator(resetPasswordPageTitle) 
}

export async function clickSendRecoveryCodeBtn(): Promise<void> {
    await page.clickByLocator(sendRecoveryCodeBtn)
}

export async function receiveRecoveryCodeWithEmail(email: string): Promise<void> {
    await page.sendValueByLocator(emailInput, email)
    await page.clickByLocator(sendRecoveryCodeBtn)
}

export async function clickNextBtn(email: string): Promise<void> {
    await page.sendValueByLocator(emailInput, email)
    await page.clickByLocator(sendRecoveryCodeBtn)
    await page.clickByLocator(nextBtn)
}

export async function clickNextWithRecoveryCode(email: string, recoveryCode: string): Promise<void> {
    await page.sendValueByLocator(emailInput, email)
    await page.clickByLocator(sendRecoveryCodeBtn)
    await page.sendValueByLocator(recoveryCodeInput, recoveryCode)
    await page.clickByLocator(nextBtn)
}