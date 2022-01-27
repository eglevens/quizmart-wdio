import * as page from "./page"

const landingPageTitle = '(//h1)[1]'

const signInWithEmailBtn = '//button[text()="Sign in with email"]'
const continueWithGoogleBtn = '//button[text()="Continue with Google"]'
const continueWithFacebookBtn = '//button[text()="Continue with Facebook"]'
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

export async function clickContinueWithGoogleBtn(): Promise<void> {
    await page.clickByLocator(continueWithGoogleBtn)
}

export async function clickContinueWithFacebookBtn(): Promise<void> {
    await page.clickByLocator(continueWithFacebookBtn)
}

//----------------WAIT----------------

export async function waitForTermsAndConditionsLinkInViewport(timeToWait?: number) {
    await page.waitUntilElementIsVisibleInViewportByLocator(termsAndConditionsLink, timeToWait)
}

//----------------GET----------------

export async function isTermsAndConditionsLinkDisplayed(): Promise<boolean> {
    return await page.elementPresentByLocator(continueWithGoogleBtn)
}

export async function getLandingPageTitleText(): Promise<string> {
    return await page.getElementTextByLocator(landingPageTitle)
}