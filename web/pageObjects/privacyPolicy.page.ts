import * as page from './page'

const header = '(//h1)[1]'
const closeBtn = '//*[@id="btn_close"]'

//----------------WAIT----------------


export async function getPageHeaderText() {
    await page.waitUntilElementIsPresentByLocator(closeBtn)
    return await (await page.getElementByLocator(header)).getText()
}