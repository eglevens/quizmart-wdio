import * as page from './page'


const privacyPolicyPageTitle = '//h1[text()="Privacy Policy"]'

//----------------WAIT----------------

export async function waitForPrivacyPolicyPageTitleTextIsDisplayed(timeToWait?: number): Promise<void> {
    await page.waitUntilElementIsVisibleInViewportByLocator(privacyPolicyPageTitle, timeToWait)
}

export async function isPrivacyPolicyTitleDisplayed(): Promise<boolean> {
    return await page.isElementVisibleInViewportByLocator(privacyPolicyPageTitle)
}