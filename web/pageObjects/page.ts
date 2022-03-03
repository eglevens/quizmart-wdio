const headerGuest = '(//h1)[1]'
const headerLoggedIn = '//div[./p[@data-cy="subtitle"]]//h1'
const backendFormValidationError = '//form/div/h3'

function link(href: string): string {
    return `//a[@href="${href}"]`
}

function formInput(inputName: string): string {
    return `//main //form //input[@name = "${inputName}"]`
}

function formButton(btnName: string): string {
    return `//form //button[text()="${btnName}"]`
}

function frontendInputError(inputName: string): string {
    return `//div[./input[@name="${inputName}"]]//h3`
}

function button(btnName: string): string {
    return `//button[text()="${btnName}"]`
}


//----------------DEFAULT----------------

export async function openLandingPage(): Promise<void> {
    await browser.url('')
}

export async function openRegisterPage(): Promise<void> {
    await browser.url('sign-up/')
}

export async function openSignInPage(): Promise<void> {
    await browser.url('sign-in/')
}

export async function openForgotPassPage(): Promise<void> {
    await browser.url('reset-password/')
}

export async function openForgotPassPageRecoveryCode(): Promise<void> {
    await browser.url('reset-password/#recovery')
}

//----------------GET----------------

export async function getElementByLocator(locator: string): Promise<WebdriverIO.Element> {
    return await (browser).$(locator)
}

export async function getElementTextByLocator(locator: string): Promise<string> {
    return await (await getElementByLocator(locator)).getText()
}

export async function getPageHeaderTextForGuest(): Promise<string> {
    return await (await getElementByLocator(headerGuest)).getText()
}

export async function getPageHeaderTextForLoggedInUser(): Promise<string> {
    return await (await getElementByLocator(headerLoggedIn)).getText()
}

export async function getBackendFormValidationError(): Promise<string> {
    return await getElementTextByLocator(backendFormValidationError)
}

export async function getFrontendInputValidationTextByInputName(inputName: string): Promise<string> {
    return await getElementTextByLocator(frontendInputError(inputName))
}


//----------------ACTION----------------

export async function clickByLocator(locator: string): Promise<void> {
    await (await getElementByLocator(locator)).click()
}

export async function sendValueByLocator(locator: string, value: string): Promise<void> {
    await (await getElementByLocator(locator)).addValue(value)
}

//---

export async function clickOnLink(href: string): Promise<void> {
    await (await getElementByLocator(link(href))).click()
}

export async function clickOnButton(btnName: string): Promise<void> {
    await (await getElementByLocator(button(btnName))).click()
}

export async function clickOnFormButton(btnName: string): Promise<void> {
    await (await getElementByLocator(formButton(btnName))).click()
}

export async function fillFormInputWithValue(inputName: string, value: string): Promise<void> {
    await sendValueByLocator(formInput(inputName), value)
}

//----------------WAIT----------------

const defaultTimeout = 2000

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

export async function waitUntilElementIsPresentByLocator(locator: string, customTimeout?: number): Promise<void> {
    const timeoutMessage = `${locator} element still invisible after ${customTimeout || defaultTimeout} ms`
    await browser.waitUntil(async function () {
        return (await getElementByLocator(locator)).isDisplayed()
    },
    {
        timeout: customTimeout || defaultTimeout,
        timeoutMsg: timeoutMessage
    })
}

export async function waitUntilElementIsClickableByLocator(locator: string, customTimeout?: number): Promise<void> {
    const timeoutMessage = `${locator} element still invisible after ${customTimeout || defaultTimeout} ms`
    await browser.waitUntil(async function () {
        return (await getElementByLocator(locator)).isClickable()
    },
    {
        timeout: customTimeout || defaultTimeout,
        timeoutMsg: timeoutMessage
    })
}

//----------------WAIT BY TEXT----------------

export async function waitUntilButtonByTextIsVisibleInViewport(btnName: string, customTimeout?: number): Promise<void> {
    const timeoutMessage = `${btnName} button still invisible after ${customTimeout || defaultTimeout} ms`
    await browser.waitUntil(async function () {
        return (await getElementByLocator(button(btnName))).isDisplayedInViewport()
    },
    {
        timeout: customTimeout || defaultTimeout,
        timeoutMsg: timeoutMessage
    })
}

export async function waitUntilFormButtonByTextIsVisibleInViewport(btnName: string, customTimeout?: number): Promise<void> {
    const timeoutMessage = `${btnName} button still invisible after ${customTimeout || defaultTimeout} ms`
    await browser.waitUntil(async function () {
        return (await getElementByLocator(formButton(btnName))).isDisplayed()
    },
    {
        timeout: customTimeout || defaultTimeout,
        timeoutMsg: timeoutMessage
    })
}

export async function waitUntilFormButtonByTextIsClickable(btnName: string, customTimeout?: number): Promise<void> {
    const timeoutMessage = `${btnName} button still unclickable after ${customTimeout || defaultTimeout} ms`
    await browser.waitUntil(async function () {
        return (await getElementByLocator(formButton(btnName))).isClickable()
    },
    {
        timeout: customTimeout || defaultTimeout,
        timeoutMsg: timeoutMessage
    })
}