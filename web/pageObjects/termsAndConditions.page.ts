import * as page from './page'


const termsAndConditionsPageTitle = '//h1[text()="Terms and Conditions"]'

//----------------WAIT----------------

export async function waitForTermsAndConditionsPageTitleText(): Promise<void> {
    await page.waitUntilElementIsVisibleInViewportByLocator(termsAndConditionsPageTitle)
}

export async function isTermsAndConditionsTitleTextDisplayed(): Promise<boolean> {
    return await page.isElementVisibleInViewportByLocator(termsAndConditionsPageTitle)
}
