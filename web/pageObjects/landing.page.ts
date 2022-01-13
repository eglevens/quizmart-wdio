import * as page from "./page"


const loginWithEmailBtn = '//button[text()="Sign in with email"]'


export async function clickLoginWithEmailBtn(): Promise<void> {
    await page.clickByLocator(loginWithEmailBtn)
}