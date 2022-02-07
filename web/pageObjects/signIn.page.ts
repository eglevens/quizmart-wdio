import * as page from './page'
import * as Enums from '../utils/enums'

async function clickLoginBtn() {
    await page.clickOnFormButton(Enums.Button.SignIn)

}

//----------------ACTION----------------

export async function signInWithEmail(email: string, pass: string): Promise<void> {
    await page.fillFormInputWithValue(Enums.Input.Email, email)
    await page.fillFormInputWithValue(Enums.Input.Password, pass)
    await clickLoginBtn()
}

export async function fillEmailInputAndLoseFocus(email: string): Promise<void> {
    await page.fillFormInputWithValue(Enums.Input.Email, email)
    await clickLoginBtn()
}

export async function fillPassInputAndLoseFocus(pass: string): Promise<void> {
    await page.fillFormInputWithValue(Enums.Input.Password, pass)
    await clickLoginBtn()
}

