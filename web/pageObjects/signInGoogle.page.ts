import * as page from "./page"

const emailInput = '//input[@type="email"]'
const passInput = '//input[@name="password"]'

const nextBtn = '//button //span[text()="Kitas"]'


//----------------ACTION----------------

export async function continueWithGoogle(email: string, pass: string): Promise<void> {
    await page.waitUntilElementIsClickableByLocator(nextBtn, 10000)
    await page.sendValueByLocator(emailInput, email)
    await page.clickByLocator(nextBtn)
    await page.waitUntilElementIsClickableByLocator(nextBtn, 10000)
    await page.sendValueByLocator(passInput, pass)
    await page.clickByLocator(nextBtn)
}

//----------------WAIT----------------

export async function waitForNextBtnInGoogleIsClickable(): Promise<void> {
    await page.waitUntilElementIsClickableByLocator(nextBtn)
}