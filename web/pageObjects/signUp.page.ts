import * as page from "./page"


const signUpPageTitle = 'h1'


export async function getSignUpPageTitleText(): Promise<string> {
    return await page.getElementTextByLocator(signUpPageTitle)
}
