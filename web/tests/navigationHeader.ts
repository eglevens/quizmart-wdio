import * as page from '../pageObjects/page'
import * as api from '../utils/api'
import * as enums from '../utils/enums'
import { expect } from 'chai'
const chai = require('chai')
chai.use(require('chai-url'))


describe('Navigation from header', () => {

    beforeEach(async function () {
        await api.loginToQuizmartApp()
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

    it('Click to openone page in offline mode', async () => {
        await page.setOfflineMode()

        await page.clickOnLink(enums.Link.Play)
        expect(await page.waitAndReturnMessageTextByLocator()).to.equal(enums.Messages.FailedToFetch)

        await page.setOnlineMode()

        await page.waitUntilElementByTextIsNotVisibleInViewport(enums.Messages.FailedToFetch)
        await page.clickOnLink(enums.Link.Play)
        //nezinau, ar cia verta sita expect'a det, nes jeigu ir atsirastu tas alertas, tai neras is pat pradziu
        //reik pergalvot
        expect(await page.isMessageDisplayed()).to.be.false
    })

    afterEach(async function () {
        await api.takeScreenshot(this)
    })

})