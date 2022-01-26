import * as page from './page'


const headerAccountImage = '(//button/div)[1]'

//----------------WAIT----------------

export async function waitForUserProfileImageInHeader(timeToWait?: number): Promise<void> {
    await page.waitUntilElementIsVisibleInViewportByLocator(headerAccountImage, timeToWait)
}