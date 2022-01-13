import * as page from "./page"


const signInPageTitle = '//h1[text()="Sign in"]'
const emailInput = '//input[@name="email"][1]'
const passInput = '//input[@name="password"]'
const signInBtn = '//button[text()="Sign in"]'
const incorrectCredentialsError = '//*[text()="The email address or password is incorrect"]'
const emailFormatValidationError = '//input[@name="email"]/../h3[text()="Must be valid email"]'
const passwordlengthValidationError = '//input[@name="password"]/../h3[text()="Password must be at least of 6 characters in length"]'


export async function openSignIn(): Promise <void> {
    await browser.url('sign-in/')
}

export async function loginWithEmail(email: string, pass: string): Promise <void> {
    await page.sendValueByLocator(emailInput, email)
    await page.sendValueByLocator(passInput, pass)
    await page.clickByLocator(signInBtn)
}

export async function getSignInPageTitle(): Promise <string> {
    return await page.getElementTextByLocator(signInPageTitle)
}

export async function getIncorrectCredentialsError(): Promise <string> {
    return await page.getElementTextByLocator(incorrectCredentialsError)
}

export async function getEmailFormatValidationError(): Promise <string> {
    return await page.getElementTextByLocator(emailFormatValidationError)
}

export async function getPasswordlengthValidationError(): Promise <string> {
    return await page.getElementTextByLocator(passwordlengthValidationError)
}