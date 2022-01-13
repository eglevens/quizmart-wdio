import * as page from "./page"


const loginWithEmailBtn = '//button[text()="Sign in with email"]'
const registerTab = '//button[text()="Register"]'
const registerWithEmailBtn = '//button[text()="Register with email"]'


export async function clickLoginWithEmailBtn(): Promise<void> {
    await page.clickByLocator(loginWithEmailBtn)
}

export async function clickRegisterTab(): Promise<void> {
    await page.clickByLocator(registerTab)
}

export async function clickRegisterWithEmailBtn(): Promise<void> {
    await page.clickByLocator(registerWithEmailBtn)
}