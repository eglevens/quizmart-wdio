import * as page from './page'


const resetPasswordPageTitle = '//h1[text()="Reset your password"]'


export async function getForgotPassPageTitle(): Promise<boolean> {
    return await page.elementPresentByLocator(resetPasswordPageTitle) 
}