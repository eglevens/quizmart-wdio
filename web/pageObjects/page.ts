export async function openLanding(): Promise <void> {
    await browser.url('')
}

export async function getElementByLocator(locator: string) {
    return await (browser).$(locator)
}

export async function clickByLocator(locator: string): Promise<void> {
    await (await getElementByLocator(locator)).click()
}