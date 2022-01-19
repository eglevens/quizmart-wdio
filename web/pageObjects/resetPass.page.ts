import * as page from "./page"


const resetPassPageTitle = 'h1'


export async function getResetPassPageTitleText(): Promise<string> {
    return await page.getElementTextByLocator(resetPassPageTitle)
}
