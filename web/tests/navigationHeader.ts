import * as page from '../pageObjects/page'
import * as api from '../utils/api'
import * as enums from '../utils/enums'
import { expect } from 'chai'
import { user1 } from '../utils/userCredentials'
const chai = require('chai')
chai.use(require('chai-url'))


describe('Navigation from header', () => {

    beforeEach(async function () {
        await api.loginToQuizmartApp(user1.email, user1.pass)
    })

    it('Open each page by clicking on buttons', async () => {
        await page.clickOnLink(enums.Link.Play)
        expect(await page.getPageHeaderTextForLoggedIn()).equals(enums.Header.Play)
        let url = await browser.getUrl()
        chai.expect(url).to.have.path(enums.Path.Play)

        await page.clickOnLink(enums.Link.Join)
        expect(await page.getPageHeaderTextForLoggedIn()).equals(enums.Header.Join)
        url = await browser.getUrl()
        chai.expect(url).to.have.path(enums.Path.Join)

        await page.clickOnLink(enums.Link.Create)
        expect(await page.getPageHeaderTextForLoggedIn()).equals(enums.Header.Create)
        url = await browser.getUrl()
        chai.expect(url).to.have.path(enums.Path.Create)

        await page.clickOnLink(enums.Link.Collections)
        expect(await page.getPageHeaderTextForLoggedIn()).equals(enums.Header.Collections)
        url = await browser.getUrl()
        chai.expect(url).to.have.path(enums.Path.Collections)

        await page.clickOnLink(enums.Link.Discover)
        expect(await page.getPageHeaderTextForLoggedIn()).equals(enums.Header.Discover)
        url = await browser.getUrl()
        chai.expect(url).to.have.path(enums.Path.Discover)
    })

    it('Open each page by clicking on buttons on offline mode', async () => {
        await page.setOfflineMode()

        await page.clickOnLink(enums.Link.Play)
        expect(await page.getNotificationTitle()).equals(enums.Messages.FailedToFetch)

        await page.clickOnLink(enums.Link.Join)
        expect(await page.getNotificationTitle()).equals(enums.Messages.FailedToFetch)

        await page.clickOnLink(enums.Link.Create)
        expect(await page.getNotificationTitle()).equals(enums.Messages.FailedToFetch)

        await page.clickOnLink(enums.Link.Collections)
        expect(await page.getNotificationTitle()).equals(enums.Messages.FailedToFetch)

        await page.clickOnLink(enums.Link.Discover)
        expect(await page.getNotificationTitle()).equals(enums.Messages.FailedToFetch)

        await page.setOnlineMode()
    })

    it('Open collection page with mocked status from server', async () => {
        await api.abortRequest('/collections?')
        await page.clickOnLink(enums.Link.Collections)
        expect(await page.getNotificationTitle()).equals(enums.Messages.FailedToFetch)
    })

    it('Open collection page with mocked response body', async () => {

        await page.openCredits()

        await api.mockWalletResponse()

        await browser.refresh()

        expect (await page.getCurrentCredits()).equals('1400')

        await browser.mockRestoreAll()

        await browser.refresh()

        expect (await page.getCurrentCredits()).equals('200')
    })

    afterEach(async function () {
        await api.takeScreenshot(this)
    })

})