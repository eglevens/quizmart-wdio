export async function openLanding(): Promise <void> {
    await browser.url('')
}


export async function getElementByLocator(locator: string): Promise<WebdriverIO.Element> {
    return await (browser).$(locator)
}


export async function clickByLocator(locator: string): Promise<void> {
    await (await getElementByLocator(locator)).click()
}


export async function sendValueByLocator(locator: string, value: string): Promise<void> {
    await (await getElementByLocator(locator)).addValue(value)
}