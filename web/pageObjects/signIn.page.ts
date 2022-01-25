import * as page from "./page"


const signInPageTitle = '//h1'

const emailInput = '//input[@placeholder = "Email"]'
const passInput = '//input[@name="password"]'

const signInBtn = '//form //button[text()="Sign in"]'
const createAccLink = '//a[@href="/sign-up"]'
const forgotPassLink = '//a[@href="/reset-password"]'

const backendFormValidationError = '//form/div/h3'
const frontendEmailValidationError = '//div[./input[@name="email"]]//h3'
const frontendPasswordValidationError = '//div[./input[@name="password"]]//h3'

//----------------GET----------------

export async function getSignInPageTitleText(): Promise<string> {
    return await page.getElementTextByLocator(signInPageTitle)
}

export async function getIncorrectCredentialsErrorText(): Promise<string> {
    return await page.getElementTextByLocator(backendFormValidationError)
}

export async function getEmailValidationErrorText(): Promise<string> {
    return await page.getElementTextByLocator(frontendEmailValidationError)
}

export async function getPassValidationErrorText(): Promise<string> {
    return await page.getElementTextByLocator(frontendPasswordValidationError)
}

//----------------ACTION----------------

export async function clickSignInBtn(): Promise<void> {
    await page.clickByLocator(signInBtn)
}

export async function clickCreateAccLink(): Promise<void> {
    await page.clickByLocator(createAccLink)
}

export async function clickForgotPassLink(): Promise<void> {
    await page.clickByLocator(forgotPassLink)
}

export async function signInWithEmail(email: string, pass: string): Promise<void> {
    await page.sendValueByLocator(emailInput, email)
    await page.sendValueByLocator(passInput, pass)
    await page.clickByLocator(signInBtn)
}

export async function fillEmailInputAndLoseFocus(email: string): Promise<void> {
    await page.sendValueByLocator(emailInput, email)
    await page.clickByLocator(passInput)
}

export async function fillPassInputAndLoseFocus(pass: string): Promise<void> {
    await page.sendValueByLocator(passInput, pass)
    await page.clickByLocator(emailInput)
}

//----------------WAIT----------------

export async function waitForSignInFormBtnInDOM(timeToWait?): Promise<void> {
    return await page.waitUntilElementIsVisibleInDOMByLocator(signInBtn)
}

export async function waitForSignInFormBtnIsClickable(timeToWait?): Promise<void> {
    return await page.waitUntilElementIsClickableByLocator(signInBtn)
}
