import * as landingPage from '../pageObjects/landing.page'
import * as page from '../pageObjects/page'
import * as enums from '../utils/enums'
import { expect } from 'chai'


describe('Landing page cases', () => {

    beforeEach(async function (){
        await page.openLandingPage()
    })
    
    it('Open sign in page from landing page', async () => {
        await page.clickOnButton(enums.Button.SignInWithEmail)
        await page.waitUntilFormButtonByTextIsVisibleInViewport(enums.Button.SignIn)
        expect (await page.getPageHeaderTextForGuest()).equals(enums.Header.SignIn)
    })

    it('Open register page from landing page', async () => {
        await landingPage.clickRegisterWithEmailBtnFromRegisterTab()
        await page.waitUntilFormButtonByTextIsVisibleInViewport(enums.Button.Register)
        expect (await page.getPageHeaderTextForGuest()).equals(enums.Header.Register)
    })

    it('Open Terms and conditions page in new tab from landing page', async () => {
        await page.clickOnLink(enums.Link.TermsAndConditions)
        await browser.switchWindow('terms-and-conditions/')
        expect (await page.getPageHeaderTextForGuest()).equals(enums.Header.TermsAndConditions)
    })
    
})