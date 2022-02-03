export async function openLandingPage(): Promise<void> {
    await browser.url('')
    browser.execute('localStorage.clear()')
}

export async function openRegisterPage(): Promise<void> {
    await browser.url('sign-up/')
    browser.execute('localStorage.clear()')
}

export async function openSignInPage(): Promise<void> {
    await browser.url('sign-in/')
    browser.execute('localStorage.clear()')
}

export async function openForgotPassPage(): Promise<void> {
    await browser.url('reset-password/')
    browser.execute('localStorage.clear()')
}

//----------------GET----------------

export async function getElementByLocator(locator: string): Promise<WebdriverIO.Element> {
    return await (browser).$(locator)
}

export async function getElementTextByLocator(locator: string): Promise<string> {
    return await (await getElementByLocator(locator)).getText()
}

//----------------ACTION----------------

export async function clickByLocator(locator: string): Promise<void> {
    await (await getElementByLocator(locator)).click()
}

export async function sendValueByLocator(locator: string, value: string): Promise<void> {
    await (await getElementByLocator(locator)).addValue(value)
}

//----------------ASSERT----------------

export async function elementPresentByLocator(locator: string): Promise<boolean> {
    return (await getElementByLocator(locator)).isDisplayed()
}

//----------------WAIT----------------

let defaultTimeout: number = 2000

export async function waitUntilElementIsVisibleInViewportByLocator(locator: string, customTimeout?: number): Promise<void> {
    const timeoutMessage = `${locator} element still invisible after ${customTimeout || defaultTimeout} ms`
    await browser.waitUntil(async function () {
        return (await getElementByLocator(locator)).isDisplayedInViewport()
    },
        {
            timeout: customTimeout || defaultTimeout,
            timeoutMsg: timeoutMessage
        })
}

export async function waitUntilElementIsVisibleInDOMByLocator (locator: string, customTimeout?: number): Promise<void> {
    const timeoutMessage = `${locator} element still invisible after ${customTimeout || defaultTimeout} ms`
    await browser.waitUntil(async function () {
        return (await getElementByLocator(locator)).isDisplayed()
    },
        {
            timeout: customTimeout || defaultTimeout,
            timeoutMsg: timeoutMessage
        })
}

export async function waitUntilElementIsClickableByLocator (locator: string, customTimeout?: number): Promise<void> {
    const timeoutMessage = `${locator} element still invisible after ${customTimeout || defaultTimeout} ms`
    await browser.waitUntil(async function () {
        return (await getElementByLocator(locator)).isClickable()
    },
        {
            timeout: customTimeout || defaultTimeout,
            timeoutMsg: timeoutMessage
        })
}