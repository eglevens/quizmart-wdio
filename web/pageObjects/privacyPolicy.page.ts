import * as page from './page'


const privacyPolicyPageTitle = '//h1[text()="Privacy Policy"]'

//----------------WAIT----------------

export async function waitForPrivacyPolicyPageTitleText(): Promise<void> {
    await page.waitUntilElementIsVisibleInDOMByLocator(privacyPolicyPageTitle)
}

export async function isPrivacyPolicyTitleTextInDOM(): Promise<boolean> {
    return await page.elementPresentByLocator(privacyPolicyPageTitle)
}