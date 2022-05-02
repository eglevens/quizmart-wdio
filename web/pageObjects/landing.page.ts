import * as page from './page'
import * as enums from '../utils/enums'
import * as defaultCredentials from '../../userCredentials.json'

//---Google
const emailGoogleInput = '//input[@type="email"]'
const passGoogleInput = '//input[@name="password"]'

const nextEmailGoogleBtn = '//div[@id="identifierNext"] //button'
const nextPassGoogleBtn = '//div[@id="passwordNext"] //button'

//---Facebook
const cookiesPopup = '//div[@id="cookie_banner_title"]'
const acceptCookies = '//*[@data-cookiebanner="accept_button"]'

const emailFacebookInput = '//input[@id="email"]'
const passFacebookInput = '//input[@id="pass"]'

const loginFacebookBtn = '//button[@id="loginbutton"]'


async function clickLoginBtn() {
    await page.clickOnFormButton(enums.Button.SignIn)
}


//----------------ACTION----------------


export async function clickRegisterWithEmailBtnFromRegisterTab(): Promise<void> {
    await page.clickOnButton('Register')
    await page.clickOnButton('Register with email')
}

export async function openFacebook(): Promise <void> {
    await page.openLandingPage() 
    await page.clickOnButton(enums.Button.ContinueWithFacebook)
    await waitForConsentsPopupInFacebookIsVisible(6000)
}

export async function openGoogle(): Promise <void> {
    await page.openLandingPage() 
    await page.clickOnButton(enums.Button.ContinueWithGoogle)
    await waitForNextEmailBtnInGoogleIsClickable(6000)
}


//----------------ACTION----------------

export async function loginOnGoogle(email?: string, pass?: string): Promise<void> {
    await page.waitUntilElementIsClickableByLocator(nextEmailGoogleBtn, 10000)
    await page.sendValueByLocator(emailGoogleInput, email || defaultCredentials.googleEmail)
    await page.clickByLocator(nextEmailGoogleBtn)
    await page.waitUntilElementIsClickableByLocator(nextPassGoogleBtn, 10000)
    await page.sendValueByLocator(passGoogleInput, pass || defaultCredentials.googlePass)
    await page.clickByLocator(nextPassGoogleBtn)
}

export async function loginOnFacebook(email?: string, pass?: string): Promise<void> {
    await page.clickByLocator(acceptCookies)
    await page.sendValueByLocator(emailFacebookInput, email || defaultCredentials.fbEmail)
    await page.sendValueByLocator(passFacebookInput, pass || defaultCredentials.fbPass)
    await page.clickByLocator(loginFacebookBtn)
}

//----------------WAIT----------------

export async function waitForNextEmailBtnInGoogleIsClickable(timeToWait?: number): Promise<void> {
    await page.waitUntilElementIsClickableByLocator(nextEmailGoogleBtn, timeToWait)
}

export async function waitForConsentsPopupInFacebookIsVisible(timeToWait?: number): Promise<void> {
    await page.waitUntilElementIsVisibleInViewportByLocator(cookiesPopup, timeToWait)
}