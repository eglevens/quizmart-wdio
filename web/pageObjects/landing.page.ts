import * as page from "./page"


const signInWithEmailBtn = '//button[text()="Sign in with email"]'
const registerTab = '//button[text()="Register"]'
const registerWithEmailBtn = '//button[text()="Register with email"]'
const termsAndConditionsLink = '//a[@href="terms-and-conditions"]'

//----------------ACTION----------------

export async function clickSignInWithEmailBtn(): Promise<void> {
    await page.clickByLocator(signInWithEmailBtn)
}

export async function clickRegisterWithEmailBtn(): Promise<void> {
    await page.clickByLocator(registerTab)
    await page.clickByLocator(registerWithEmailBtn)
}

export async function clickTermsAndConditionsLink(): Promise<void> {
    await page.clickByLocator(termsAndConditionsLink)
}