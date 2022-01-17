import * as page from "./page"


const signInPageTitle = 'h1'
const emailInput = '//input[@placeholder = "Email"]'
const passInput = '//input[@name="password"]'
const signInBtn = '//button[text()="Sign in"]'
const backendFormValidationError = '//form/div/h3'
const frontendEmailValidationError = '//div[./input[@name="email"]]//h3'
const frontendPasswordValidationError = '//div[./input[@name="password"]]//h3'


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

export async function getSignInPageTitleText(): Promise <string> {
    return await page.getElementTextByLocator(signInPageTitle)
}

export async function getIncorrectCredentialsErrorText(): Promise<string> {
    return await page.getElementTextByLocator(backendFormValidationError)
}

// export async function getEmailFormatValidationError(): Promise <boolean> {
//     return await page.elementPresentByLocator(emailFormatValidationError)
// }

// export async function getPasswordLengthValidationError(): Promise <boolean> {
//     return await page.elementPresentByLocator(passwordlengthValidationError)
// }

// export async function getEmailRequiredValidationError(): Promise <boolean> {
//     return await page.elementPresentByLocator(emailRequiredValidationError)
// }

// export async function getPassRequiredValidationError(): Promise <boolean> {
//     return await page.elementPresentByLocator(passRequiredValidationError)
// }