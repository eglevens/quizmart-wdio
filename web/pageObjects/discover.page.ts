import * as page from './page'

const popularBtn = '//button[./input[@name="language"]]'

//----------------WAIT----------------

export async function waitForSortButtonIsDisplayed(timeToWait?: number): Promise<void> {
    await page.waitUntilElementIsVisibleInViewportByLocator(popularBtn, timeToWait)
}