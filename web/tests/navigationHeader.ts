import * as page from '../pageObjects/page'
import * as api from '../utils/api'
import * as discoverPage from '../pageObjects/discover.page'
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

    afterEach(async function() {
        await api.takeScreenshot(this)
    })

})