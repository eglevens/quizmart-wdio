import * as page from '../pageObjects/page'
import * as signInPage from '../pageObjects/signIn.page'
import * as enums from '../utils/enums'
import { expect } from 'chai'
//import * as chaiurl from 'chai-url'
const chai = require('chai');
chai.use(require('chai-url'))




describe('Navigation from header', () => {

    beforeEach(async function () {
        await signInPage.signIn()
    })

    it('Open each page by clicking on buttons', async () => {
        await page.clickOnLink(enums.Link.Join)
        expect(await page.getPageHeaderTextForLoggedInUser()).equals(enums.Header.Join)
        let url = await browser.getUrl()
        chai.expect(url).to.have.path(enums.Path.Join)

        await page.clickOnLink(enums.Link.Play)
        expect(await page.getPageHeaderTextForLoggedInUser()).equals(enums.Header.Play)
        url = await browser.getUrl()
        chai.expect(url).to.have.path(enums.Path.Play)

        await page.clickOnLink(enums.Link.Create)
        expect(await page.getPageHeaderTextForLoggedInUser()).equals(enums.Header.Create)
        url = await browser.getUrl()
        chai.expect(url).to.have.path(enums.Path.Create)

        await page.clickOnLink(enums.Link.Collections)
        expect(await page.getPageHeaderTextForLoggedInUser()).equals(enums.Header.Collections)
        url = await browser.getUrl()
        chai.expect(url).to.have.path(enums.Path.Collections)

        await page.clickOnLink(enums.Link.Discover)
        expect(await page.getPageHeaderTextForLoggedInUser()).equals(enums.Header.Discover)
        url = await browser.getUrl()
        chai.expect(url).to.have.path(enums.Path.Discover)
    })
})