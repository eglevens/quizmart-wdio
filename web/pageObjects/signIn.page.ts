import * as page from './page'
import * as enums from '../utils/enums'
import * as userCredentials from '../utils/userCredentials'
import * as discoverPage from '../pageObjects/discover.page'

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

export async function signIn(): Promise<void> {
    await page.openSignInPage()
    await signInWithEmail(userCredentials.user1.email, userCredentials.user1.pass) 
    await discoverPage.waitForSortButtonIsDisplayed(6000)
}

export async function getFormValidation(): Promise<string> {
    await page.waitUntilFormButtonByTextIsClickable(enums.Button.SignIn)
    return await page.getFormValidationError()
}