import * as page from "./page"


const resetPassPageTitle = '//h1'
const sendRecoveryCodeBtn = '//form //button[text()="Send recovery code"]'

//----------------GET----------------

export async function getResetPassPageTitleText(): Promise<string> {
    return await page.getElementTextByLocator(resetPassPageTitle)
}

//----------------WAIT----------------

export async function waitForSendRecoveryCodeBtnInDOM(): Promise<void> {
    await page.waitUntilElementIsVisibleInDOMByLocator(sendRecoveryCodeBtn)
}
