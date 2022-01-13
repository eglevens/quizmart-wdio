import * as page from './page'


const registerPageTitle = '//h1[text()="Register"]'
const emailInput = '//input[@placeholder="Email" and @name="email"]'
const passInput = '//input[@name="password"]'
const repeatPassInput = '//input[@name="passwordRepeat"]'
const signUpBtn = '//button[text()="Sign up"]'
const signInBtn = '//h3[text()="Already have account?"]/../*[text()="Sign in"]'
const newsletterCheckbox = '//div[text()="I would like to receive"]/../button[@type="button"]'
const userAlreadyExistsError = '//h3[text()="User with this email already exists."]'
const emailFormatValidationError = '//input[@name="email"]/../h3[text()="Must be valid email"]'
const passwordlengthValidationError = '//input[@name="password"]/../h3[text()="Password must be at least of 6 characters in length"]'
const notMatchingRepeatPasswordValidationError = '//input[@name="passwordRepeat"]/../h3[text()="Passwords must match"]'
const emailRequiredValidationError = '//input[@name="email"]/../h3[text()="Required"]'
const passRequiredValidationError = '//input[@name="password"]/../h3[text()="Required"]'
const repeatPassRequiredValidationError = '//input[@name="passwordRepeat"]/../h3[text()="Required"]'



export async function openRegisterPage(): Promise<void> {
    await browser.url('sign-up/')
}

export async function registerWithEmail(email: string, pass: string, repeatPass: string): Promise<void>{
    await page.sendValueByLocator(emailInput, email)
    await page.sendValueByLocator(passInput, pass)
    await page.sendValueByLocator(repeatPassInput, repeatPass)
    await page.clickByLocator(signUpBtn)
}

export async function clickSignUpBtn(): Promise<void> {
    await page.clickByLocator(signUpBtn)
}

export async function clickSignInBtn(): Promise<void> {
    await page.clickByLocator(signInBtn)
}

export async function getRegisterPageTitle(): Promise<boolean> {
    return await page.elementPresentByLocator(registerPageTitle) 
}

export async function getEmailFormatValidationError(): Promise<boolean> {
    return await page.elementPresentByLocator(emailFormatValidationError) 
}

export async function getPasswordLengthValidationError(): Promise<boolean> {
    return await page.elementPresentByLocator(passwordlengthValidationError) 
}

export async function getNotMatchingRepeatPasswordValidationError(): Promise<boolean> {
    return await page.elementPresentByLocator(notMatchingRepeatPasswordValidationError) 
}

export async function getUserAlreadyExistsError(): Promise<boolean> {
    return await page.elementPresentByLocator(userAlreadyExistsError) 
}

export async function getEmailRequiredValidationError(): Promise<boolean> {
    return await page.elementPresentByLocator(emailRequiredValidationError)
}

export async function getPassRequiredValidationError(): Promise<boolean> {
    return await page.elementPresentByLocator(passRequiredValidationError)
}

export async function getRepeatPassRequiredValidationError(): Promise<boolean> {
    return await page.elementPresentByLocator(repeatPassRequiredValidationError)
}