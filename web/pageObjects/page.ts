export async function openLandingPage(): Promise <void> {
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

export async function getElementTextByLocator(locator: string): Promise<string> {
    return await (await getElementByLocator(locator)).getText()
}

export async function elementPresentByLocator(locator: string): Promise<boolean> {
    return (await getElementByLocator(locator)) != undefined ? true : false
}