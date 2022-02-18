import * as page from './page'
import * as enums from '../utils/enums'

async function clickLoginBtn() {
    await page.clickOnFormButton(enums.Button.SignIn)

}

//----------------ACTION----------------

export async function signInWithEmail(email: string, pass: string): Promise<void> {
    await page.fillFormInputWithValue(enums.Input.Email, email)
    await page.fillFormInputWithValue(enums.Input.Password, pass)
    await clickLoginBtn()
}

export async function fillEmailInputAndLoseFocus(email: string): Promise<void> {
    await page.fillFormInputWithValue(enums.Input.Email, email)
    await clickLoginBtn()
}

export async function fillPassInputAndLoseFocus(pass: string): Promise<void> {
    await page.fillFormInputWithValue(enums.Input.Password, pass)
    await clickLoginBtn()
}

