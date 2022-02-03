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

//---Google
const emailGoogleInput = '//input[@type="email"]'
const passGoogleInput = '//input[@name="password"]'

const nextEmailGoogleBtn = '//div[@id="identifierNext"] //button'
const nextPassGoogleBtn = '//div[@id="passwordNext"] //button'

//---Facebook
const cookiesPopup = '//div[@id="cookie_banner_title"]'
const acceptCookies = '//*[@data-testid="cookie-policy-dialog-accept-button"]'

const emailFacebookInput = '//input[@id="email"]'
const passFacebookInput = '//input[@id="pass"]'

const loginFacebookBtn = '//button[@id="loginbutton"]'


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
    await clickSignInBtn()
}

export async function fillEmailInputAndLoseFocus(email: string): Promise<void> {
    await page.sendValueByLocator(emailInput, email)
    await page.clickByLocator(passInput)
}

export async function fillPassInputAndLoseFocus(pass: string): Promise<void> {
    await page.sendValueByLocator(passInput, pass)
    await page.clickByLocator(emailInput)
}

export async function loginOnGoogle(email: string, pass: string): Promise<void> {
        await page.waitUntilElementIsClickableByLocator(nextEmailGoogleBtn, 10000)
        await page.sendValueByLocator(emailGoogleInput, email)
        await page.clickByLocator(nextEmailGoogleBtn)
        await page.waitUntilElementIsClickableByLocator(nextPassGoogleBtn, 10000)
        await page.sendValueByLocator(passGoogleInput, pass)
        await page.clickByLocator(nextPassGoogleBtn)
}

export async function loginOnFacebook(email: string, pass: string): Promise<void> {
    await page.clickByLocator(acceptCookies)
    await page.sendValueByLocator(emailFacebookInput, email)
    await page.sendValueByLocator(passFacebookInput, pass)
    await page.clickByLocator(loginFacebookBtn)
}

//----------------WAIT----------------

export async function waitForSignInFormBtnIsVisible(timeToWait?: number): Promise<void> {
    return await page.waitUntilElementIsVisibleInViewportByLocator(signInBtn)
}

export async function waitForSignInFormBtnIsClickable(timeToWait?: number): Promise<void> {
    return await page.waitUntilElementIsClickableByLocator(signInBtn)
}

export async function waitForNextEmailBtnInGoogleIsClickable(timeToWait?: number): Promise<void> {
    await page.waitUntilElementIsClickableByLocator(nextEmailGoogleBtn, timeToWait)
}

export async function waitForConsentsPopupInFacebookIsVisible(timeToWait?: number): Promise<void> {
    await page.waitUntilElementIsVisibleInViewportByLocator(cookiesPopup, timeToWait)
}