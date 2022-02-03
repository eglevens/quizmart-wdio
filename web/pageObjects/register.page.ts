import * as page from "./page"


const registerPageTitle = '//h1'
const emailInput = '//input[@placeholder="Email"]'
const passInput = '//input[@name="password"]'
const passRepeatInput = '//input[@name="passwordRepeat"]'

const registerBtn = '//form //button[text()="Sign up"]'
const signInLink = '//*[@href="/sign-in"]'
const newsletterCheckbox = '//button[@type="button"]'
const newsletterPrivacyPolicyLink = '//div[./*[text()="I would like to receive"]]//a'

const backendFormValidationError = '//form/div/h3'
const frontendEmailValidationError = '//div[./input[@name="email"]]//h3'
const frontendPasswordValidationError = '//div[./input[@name="password"]]//h3'
const frontendPasswordRepeatValidationError = '//div[./input[@name="passwordRepeat"]]//h3'

//----------------GET----------------

export async function getRegisterPageTitleText(): Promise<string> {
    return await page.getElementTextByLocator(registerPageTitle)
}

export async function getEmailValidationErrorText(): Promise<string> {
    return await page.getElementTextByLocator(frontendEmailValidationError)
}

export async function getPassValidationErrorText(): Promise<string> {
    return await page.getElementTextByLocator(frontendPasswordValidationError)
}

export async function getPassRepeatValidationErrorText(): Promise<string> {
    return await page.getElementTextByLocator(frontendPasswordRepeatValidationError)
}

export async function getAlreadyRegisteredUserErrorText(): Promise<string> {
    return await page.getElementTextByLocator(backendFormValidationError)
}

//----------------ACTION----------------

export async function clickRegisterBtn(): Promise<void> {
    await page.clickByLocator(registerBtn)
}

export async function clickSignInLink(): Promise<void> {
    await page.clickByLocator(signInLink)
}

export async function clickNewsletterPrivacyPolicyLink(): Promise<void> {
    await page.clickByLocator(newsletterPrivacyPolicyLink)
}

export async function registerWithEmail(email: string, pass: string, passRepeat: string): Promise<void> {
    await page.sendValueByLocator(emailInput, email)
    await page.sendValueByLocator(passInput, pass)
    await page.sendValueByLocator(passRepeatInput, passRepeat)
    await clickRegisterBtn()
}

export async function registerWithEmailAndNewsletterSubscription(email: string, pass: string, passRepeat: string): Promise<void> {
    await page.sendValueByLocator(emailInput, email)
    await page.sendValueByLocator(passInput, pass)
    await page.sendValueByLocator(passRepeatInput, passRepeat)
    await page.clickByLocator(newsletterCheckbox)
    await clickRegisterBtn()
}

export async function fillEmailInputAndLoseFocus(email: string): Promise<void> {
    await page.sendValueByLocator(emailInput, email)
    await page.clickByLocator(passInput)
}

export async function fillPassInputsAndLoseFocus(pass: string, passRepeat: string): Promise<void> {
    await page.sendValueByLocator(passInput, pass)
    await page.sendValueByLocator(passRepeatInput, passRepeat)
    await page.clickByLocator(emailInput)
}

//----------------WAIT----------------

export async function waitForRegisterFormBtnIsVisible(timeToWait?: number): Promise<void> {
    return await page.waitUntilElementIsVisibleInViewportByLocator(registerBtn)
}

export async function waitForRegisterFormBtnIsClickable(timeToWait?: number): Promise<void> {
    return await page.waitUntilElementIsClickableByLocator(registerBtn, timeToWait)
}