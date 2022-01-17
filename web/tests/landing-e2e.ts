import * as page from "../pageObjects/page"
import * as landingPage from "../pageObjects/landing.page"
import * as signInPage from "../pageObjects/signIn.page"
import { expect } from 'chai'


describe('Landing page cases', () => {
    
    it('Open sign in page from landing page', async () => {
        await page.openLandingPage()
        await landingPage.clickSignInWithEmailBtn()
        await browser.pause(3000)
        expect(await signInPage.getSignInPageTitleText()).equals('Sign in')
    })
    
})