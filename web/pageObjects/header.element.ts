import * as page from './page'

const headerAccountImage = '(//button/div)[1]'

export async function waitForUserProfileImageInHeader(): Promise<void> {
    await page.waitUntilElementIsVisibleInViewportByLocator(headerAccountImage)
}