import * as landingPage from '../pageObjects/landing.page'
import * as page from '../pageObjects/page'
import * as Enums from '../utils/enums'
import { expect } from 'chai'


describe('Landing page cases', () => {

    beforeEach(async function (){
        await page.openLandingPage()
    })
    
    it('Open sign in page from landing page', async () => {
        await page.clickOnButton(Enums.Button.SignInWithEmail)
        await page.waitUntilFormButtonByTextIsVisibleInViewport(Enums.Button.SignIn)
        expect (await page.getPageHeaderText()).equals(Enums.Header.SignIn)
    })

    it('Open register page from landing page', async () => {
        await landingPage.clickRegisterWithEmailBtnFromRegisterTab()
        await page.waitUntilFormButtonByTextIsVisibleInViewport(Enums.Button.Register)
        expect (await page.getPageHeaderText()).equals(Enums.Header.Register)
    })

    it('Open Terms and conditions page in new tab from landing page', async () => {
        await page.clickOnLink(Enums.Link.TermsAndConditions)
        await browser.switchWindow('terms-and-conditions/')
        expect (await page.getPageHeaderText()).equals(Enums.Header.TermsAndConditions)
    })
    
})