import * as page from './page'


const headerAccountImage = '(//button/div)[1]'

//----------------WAIT----------------

export async function waitForUserProfileImageInHeader(timeToWait?): Promise<void> {
    await page.waitUntilElementIsVisibleInViewportByLocator(headerAccountImage)
}