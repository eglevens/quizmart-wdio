import * as page from "./page"

const signInTitle = '//h1[text()="Sign in"]'
const emailInput = '//input[@name="email"][1]'
const passInput = '//input[@name="password"]'
const signInBtn = '//button[text()="Sign in"]'
const incorrectCredentialsError = '//*[text()="The email address or password is incorrect"]'

export async function openSignIn(): Promise <void> {
    await browser.url('sign-in/')
}


export async function getSignInTitle(): Promise <void> {
    await page.getElementByLocator(signInTitle)
}


export async function login(email: string, pass: string): Promise <void> {
    await page.sendValueByLocator(emailInput, email)
    await page.sendValueByLocator(passInput, pass)
    await page.clickByLocator(signInBtn)
}


export async function getIncorrectCredentialsError(): Promise <void> {
    await page.getElementByLocator(incorrectCredentialsError)
}