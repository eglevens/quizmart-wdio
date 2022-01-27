import * as page from "./page"

const cookiesPopup = '//div[@id="cookie_banner_title"]'
const acceptCookies = '//*[@data-testid="cookie-policy-dialog-accept-button"]'

const emailInput = '//input[@id="email"]'
const passInput = '//input[@id="pass"]'

const loginBtn = '//button[@id="loginbutton"]'


//----------------ACTION----------------

export async function loginOnFacebook(email: string, pass: string): Promise<void> {
    await page.clickByLocator(acceptCookies)
    await page.sendValueByLocator(emailInput, email)
    await page.sendValueByLocator(passInput, pass)
    await page.clickByLocator(loginBtn)
}

//----------------WAIT----------------

export async function waitForConsentsPopupIsVisible(timeToWait?: number): Promise<void> {
    await page.waitUntilElementIsVisibleInViewportByLocator(cookiesPopup, timeToWait)
}