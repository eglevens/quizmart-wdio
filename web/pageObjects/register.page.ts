import * as page from './page'


const registerPageTitle = '//h1[text()="Register"]'


export async function getRegisterPageTitle(): Promise<boolean> {
    return await page.elementPresentByLocator(registerPageTitle) 
}