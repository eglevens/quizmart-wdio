import * as page from "./page"


const signInWithEmailBtn = '//button[text()="Sign in with email"]'


export async function clickSignInWithEmailBtn(): Promise<void> {
    await page.clickByLocator(signInWithEmailBtn)
}