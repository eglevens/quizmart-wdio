import * as page from './page'


const closeBtn = '//*[@id="btn_close"]'

//----------------WAIT----------------

export async function waitForCloseBtnToBePresent(timeToWait?: number): Promise<void> {
    await page.waitUntilElementIsPresentByLocator(closeBtn, timeToWait)
}