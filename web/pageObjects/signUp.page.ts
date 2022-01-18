import * as page from "./page"


const signUpPageTitle = 'h1'
const emailInput = '//input[@placeholder="Email"]'
const passInput = '//input[@name="password"]'
const repeatPassInput = '//input[@name="passwordRepeat"]'

const signUpBtn = '//button[text()="Sign up"]'
const signInBtn = '//*[@href="/sign-in"]'
const newsletterCheckbox = '//button[@type="button"]'
const newsletterPrivacyPolicyLink = '//div[./*[text()="I would like to receive"]]//a'

const backendFormValidationError = '//form/div/h3'
const frontendEmailValidationError = '//div[./input[@name="email"]]//h3'
const frontendPasswordValidationError = '//div[./input[@name="password"]]//h3'
const frontendPasswordRepeatValidationError = '//div[./input[@name="passwordRepeat"]]//h3'


export async function openSignUpPage(): Promise<void> {
    await browser.url('sign-up/')
} 

export async function clickSignInBtn(): Promise<void> {
    await page.clickByLocator(signInBtn)
}

export async function clickNewsletterPrivacyPolicyLink(): Promise<void> {
    await page.clickByLocator(newsletterPrivacyPolicyLink)
}

export async function getSignUpPageTitleText(): Promise<string> {
    return await page.getElementTextByLocator(signUpPageTitle)
}
