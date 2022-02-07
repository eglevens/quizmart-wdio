import * as page from './page'
import * as Enums from '../utils/enums'

const newsletterCheckbox = '//button[@type="button"]'
const newsletterPrivacyPolicyLink = '//a[text()="communications"]'


//--------------------------------

async function fillRegistrationForm(email: string, pass: string, passRepeat: string): Promise<void> {
    await page.fillFormInputWithValue(Enums.Input.Email, email)
    await page.fillFormInputWithValue(Enums.Input.Password, pass)
    await page.fillFormInputWithValue(Enums.Input.RepeatPass, passRepeat)
}

//----------------ACTION----------------

export async function clickRegisterBtn(): Promise<void> {
    await page.clickOnFormButton(Enums.Button.Register)
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
    await page.fillFormInputWithValue(Enums.Input.Email, email)
    await clickRegisterBtn()
}

export async function fillPassInputsAndLoseFocus(pass: string, passRepeat: string): Promise<void> {
    await page.fillFormInputWithValue(Enums.Input.Password, pass)
    await page.fillFormInputWithValue(Enums.Input.RepeatPass, passRepeat)
    await clickRegisterBtn()
}
