import * as page from './page'


const closeBtn = '//*[@id="btn_close"]'

//----------------WAIT----------------

export async function waitForCloseBtnIsDisplayed(timeToWait?: number): Promise<void> {
    await page.waitUntilElementIsVisibleInViewportByLocator(closeBtn, timeToWait)
}