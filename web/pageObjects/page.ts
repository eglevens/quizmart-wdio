import * as enums from '../utils/enums'

const headerGuest = '(//h1)[1]'
const headerLoggedIn = '//div[./p[@data-cy="subtitle"]]//h1'
const backendFormValidationError = '//form/div/h3'
const popularBtn = '//button[./input[@name="language"]]'
const message = '//div[@data-cy="notification"]'


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

function input(inputName: string): string {
    return `//input[@name="${inputName}"]`
}

function elByText(text: string): string {
    return `//*[text() = '${text}']`
}

//----------------DEFAULT----------------

export async function openLandingPage(): Promise<void> {
    await browser.url('')
}

export async function openRegisterPage(): Promise<void> {
    await browser.url('sign-up/')
    await waitUntilFormButtonByTextIsClickable(enums.Button.Register)
}

export async function openSignInPage(): Promise<void> {
    await browser.url('sign-in/')
    await waitUntilFormButtonByTextIsClickable(enums.Button.SignIn)
}

export async function openForgotPassPage(): Promise<void> {
    await browser.url('reset-password/')
    await waitUntilFormButtonByTextIsClickable(enums.Button.SendRecoveryCode)
}

export async function openForgotPassPageRecoveryCode(): Promise<void> {
    await browser.url('reset-password/#recovery')
}

export async function openDiscover(): Promise<void> {
    await browser.url('https://staging-app.quizmart.io/discover')
    await waitUntilSortButtonIsDisplayed()
}

export async function openCreatePage(): Promise<void> {
    await browser.url('https://staging-app.quizmart.io/library/quiz/add')
}

export async function openMyCreatedQuizPage(): Promise<void> {
    await browser.url('https://staging-app.quizmart.io/collections/created-collections')
}


//----------------GET----------------

export async function getElementByLocator(locator: string): Promise<WebdriverIO.Element> {
    return await (browser).$(locator)
}

export async function isMessageDisplayed(): Promise<boolean> {
    return await (await getElementByLocator(message)).isDisplayed()
}

export async function getElementsByLocator(locator: string) {
    return await (browser).$$(locator)
}

export async function elementPresentByElementText(elText: string): Promise<boolean> {
    return (await getElementsByLocator(elByText(elText))).length > 0
}

export async function getElementTextByLocator(locator: string): Promise<string> {
    return await (await getElementByLocator(locator)).getText()
}

export async function getPageHeaderText(): Promise<string> {
    return await (await getElementByLocator(headerGuest)).getText()
}

export async function getPageHeaderTextForGuestAfterFormBtnIsVisible(btn: string, timeToWait?: number): Promise<string> {
    await waitUntilFormButtonByTextIsVisibleInViewport(btn, timeToWait)
    return await getPageHeaderText()
}

export async function getPageHeaderTextForGuestAfterBtnIsVisible(btn: string, timeToWait?: number): Promise<string> {
    await waitUntilButtonByTextIsVisibleInViewport(btn, timeToWait)
    return await getPageHeaderText()
}

export async function getPageHeaderTextForLoggedIn(): Promise<string> {
    return await (await getElementByLocator(headerLoggedIn)).getText()
}

export async function getPageHeaderTextAfterLogin(): Promise<string> {
    await waitUntilSortButtonIsDisplayed(8000)
    return await getPageHeaderTextForLoggedIn()
}

export async function getFormValidationError(): Promise<string> {
    return await getElementTextByLocator(backendFormValidationError)
}

export async function getInputValidationTextByInputName(inputName: string): Promise<string> {
    return await getElementTextByLocator(frontendInputError(inputName))
}


//----------------ACTION----------------

export async function clickByLocator(locator: string): Promise<void> {
    await (await getElementByLocator(locator)).click()
}

export async function sendValueByLocator(locator: string, value: string): Promise<void> {
    await (await getElementByLocator(locator)).addValue(value)
}

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

export async function fillInputWithValue(inputName: string, value: string): Promise<void> {
    await sendValueByLocator(input(inputName), value)
}

export async function scrollIntoInputView(inputName: string): Promise<void> {
    await (await getElementByLocator(input(inputName))).scrollIntoView()
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

export async function waitUntilSortButtonIsDisplayed(customTimeout?: number): Promise<void> {
    const timeoutMessage = `${popularBtn} element still invisible after ${customTimeout || defaultTimeout} ms`
    await browser.waitUntil(async function () {
        return (await getElementByLocator(popularBtn)).isDisplayedInViewport()
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

export async function waitUntilButtonByTextIsNotVisibleInViewport(btnName: string): Promise<any> {
    return (await getElementByLocator(button(btnName))).waitForExist({ reverse: true })
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

export async function waitAndReturnMessageTextByLocator(customTimeout?: number): Promise<any> {
    const timeoutMessage = `${message} element still not displayed in viewport after ${customTimeout || defaultTimeout} ms`
    if (await browser.waitUntil(async function() {
            return await (await getElementByLocator(message)).isDisplayedInViewport()
        },
        {
            timeout: customTimeout || defaultTimeout,
            timeoutMsg: timeoutMessage
        })) {
        return (await getElementByLocator(message)).getText()
    } else {
        throw Error
    }
}

export async function isButtonByTextDisplayed(btnName: string): Promise<boolean> {
    return (await getElementByLocator(button(btnName))).isDisplayed()
}

export async function waitUntilElementByTextIsNotVisibleInViewport(el: string): Promise<any> {
    return (await getElementByLocator(elByText(el))).waitForExist({ timeout: 5000, reverse: true, interval: 5 })
}

//----------------Throttle----------------

export async function setOfflineMode(): Promise<void> {
    await browser.throttle({
        offline: true,
        downloadThroughput: 200 * 1024 / 8,
        uploadThroughput: 200 * 1024 / 8,
        latency: 20
    })
}

export async function setOnlineMode(): Promise<void> {
    await browser.throttle({
        offline: false,
        downloadThroughput: 200 * 1024 / 8,
        uploadThroughput: 200 * 1024 / 8,
        latency: 20
    })
}