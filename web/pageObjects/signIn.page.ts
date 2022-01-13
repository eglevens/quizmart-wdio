import * as page from "./page"


const signInPageTitle = '//h1[text()="Sign in"]'
const emailInput = '//input[@name="email"][1]'
const passInput = '//input[@name="password"]'
const signInBtn = '//button[text()="Sign in"]'
const incorrectCredentialsError = '//*[text()="The email address or password is incorrect"]'
const emailFormatValidationError = '//input[@name="email"]/../h3[text()="Must be valid email"]'
const passwordlengthValidationError = '//input[@name="password"]/../h3[text()="Password must be at least of 6 characters in length"]'
const emailRequiredValidationError = '//input[@name="email"]/../h3[text()="Required"]'
const passRequiredValidationError = '//input[@name="password"]/../h3[text()="Required"]'


export async function openSignInPage(): Promise <void> {
    await browser.url('sign-in/')
}

export async function clickSignInBtn(): Promise <void> {
    await page.clickByLocator(signInBtn)
}

export async function signInWithEmail(email: string, pass: string): Promise <void> {
    await page.sendValueByLocator(emailInput, email)
    await page.sendValueByLocator(passInput, pass)
    await page.clickByLocator(signInBtn)
}

export async function getSignInPageTitle(): Promise <boolean> {
    return await page.elementPresentByLocator(signInPageTitle)
}

export async function getIncorrectCredentialsError(): Promise <boolean> {
    return await page.elementPresentByLocator(incorrectCredentialsError)
}

export async function getEmailFormatValidationError(): Promise <boolean> {
    return await page.elementPresentByLocator(emailFormatValidationError)
}

export async function getPasswordLengthValidationError(): Promise <boolean> {
    return await page.elementPresentByLocator(passwordlengthValidationError)
}

export async function getEmailRequiredValidationError(): Promise <boolean> {
    return await page.elementPresentByLocator(emailRequiredValidationError)
}

export async function getPassRequiredValidationError(): Promise <boolean> {
    return await page.elementPresentByLocator(passRequiredValidationError)
}