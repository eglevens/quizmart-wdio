import * as page from "./page"


const resetPassPageTitle = '//h1'

const emailInput = '//main //input[@name="email"]'
const recoveryCodeInput = '//input[@name="recoveryCode"]'

const sendRecoveryCodeBtn = '//form //button[text()="Send recovery code"]'
const nextBtn = '//main //button[@type="submit"]'
const doneBtn = '//main //button[@type="submit"]'

const backendFormValidationError = '//main //form/h3'
const frontendEmailValidationError = '//div[./input[@name="email"]]//h3'
const frontendRecoveryCodeValidationError = '//div[./input[@name="recoveryCode"]]/h3'


//----------------ACTION----------------

export async function receiveRecoveryCodeWithEmail(email: string): Promise<void> {
    await page.sendValueByLocator(emailInput, email)
    await page.clickByLocator(sendRecoveryCodeBtn)
}

export async function fillEmailInputAndLoseFocus(email: string): Promise<void> {
    await page.sendValueByLocator(emailInput, email)
    await page.clickByLocator(sendRecoveryCodeBtn)
}

export async function clickSendRecoveryCodeBtn(): Promise<void> {
    await page.clickByLocator(sendRecoveryCodeBtn)
}

export async function fillRecoveryCodeAndLoseFocus(recoveryCode: string): Promise<void> {
    await page.sendValueByLocator(recoveryCodeInput, recoveryCode)
    await page.clickByLocator(nextBtn)
}

export async function clickRecoveryCodeInputAndLoseFocus(recoveryCode?: string): Promise<void> {
    await page.clickByLocator(recoveryCodeInput)
    await page.clickByLocator(nextBtn)
}


//----------------GET----------------

export async function getResetPassPageTitleText(): Promise<string> {
    return await page.getElementTextByLocator(resetPassPageTitle)
}

export async function getNoUserWithThisEmailErrorText(): Promise<string> {
    return await page.getElementTextByLocator(backendFormValidationError)
}

export async function getEmailValidationErrorText(): Promise<string> {
    return await page.getElementTextByLocator(frontendEmailValidationError)
}

export async function getRecoveryCodeValidationErrorText(): Promise<string> {
    return await page.getElementTextByLocator(frontendRecoveryCodeValidationError)
}

//----------------WAIT----------------

export async function waitForSendRecoveryCodeBtnIsVisible(timeToWait?: number): Promise<void> {
    await page.waitUntilElementIsVisibleInViewportByLocator(sendRecoveryCodeBtn)
}

export async function waitForSendRecoveryCodeBtnIsClickable(): Promise<void> {
    await page.waitUntilElementIsClickableByLocator(sendRecoveryCodeBtn)
}

export async function waitForNextBtnIsClickable(): Promise<void> {
    await page.waitUntilElementIsClickableByLocator(nextBtn)
}

export async function waitForDoneBtnIsClickable(): Promise<void> {
    await page.waitUntilElementIsClickableByLocator(nextBtn)
}