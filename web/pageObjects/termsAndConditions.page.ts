import * as page from './page'


const termsAndConditionsPageTitle = '//h1[text()="Terms and Conditions"]'

//----------------WAIT----------------

export async function waitForTermsAndConditionsPageTitleText(): Promise<void> {
    await page.waitUntilElementIsVisibleInDOMByLocator(termsAndConditionsPageTitle)
}

export async function isTermsAndConditionsTitleTextInDOM(): Promise<boolean> {
    return await page.elementPresentByLocator(termsAndConditionsPageTitle)
}
