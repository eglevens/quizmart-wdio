import * as page from './page'
import * as enums from '../utils/enums'

const newsletterCheckbox = '//button[@type="button"]'
const newsletterPrivacyPolicyLink = '//a[text()="communications"]'


//--------------------------------

async function fillRegistrationForm(email: string, pass: string, passRepeat: string): Promise<void> {
    await page.fillFormInputWithValue(enums.Input.Email, email)
    await page.fillFormInputWithValue(enums.Input.Password, pass)
    await page.fillFormInputWithValue(enums.Input.RepeatPass, passRepeat)
}

//----------------ACTION----------------

export async function clickRegisterBtn(): Promise<void> {
    await page.clickOnFormButton(enums.Button.Register)
}

export async function clickNewsletterPrivacyPolicyLink(): Promise<void> {
    await page.clickByLocator(newsletterPrivacyPolicyLink)
}

export async function registerWithEmail(email: string, pass: string, passRepeat: string): Promise<void> {
    await fillRegistrationForm(email, pass, passRepeat)
    await clickRegisterBtn()
}

export async function registerWithEmailAndNewsletterSubscription(email: string, pass: string, passRepeat: string): Promise<void> {
    await fillRegistrationForm(email, pass, passRepeat)
    await page.clickByLocator(newsletterCheckbox)
    await clickRegisterBtn()
}

export async function fillEmailInputAndLoseFocus(email: string): Promise<void> {
    await page.fillFormInputWithValue(enums.Input.Email, email)
    await clickRegisterBtn()
}

export async function fillPassInputs(pass: string, passRepeat: string): Promise<void> {
    await page.fillFormInputWithValue(enums.Input.Password, pass)
    await page.fillFormInputWithValue(enums.Input.RepeatPass, passRepeat)
    await clickRegisterBtn()
}

export async function getFormValidation(): Promise<string> {
    await page.waitUntilFormButtonByTextIsClickable(enums.Button.Register)
    return await page.getFormValidationError()
}