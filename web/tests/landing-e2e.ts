import * as page from "../pageObjects/page"
import * as landingPage from "../pageObjects/landing.page"
import * as signInPage from "../pageObjects/signIn.page"
import * as signUpPage from "../pageObjects/signUp.page"
import * as assert from "../values/assertionValue"
import { expect } from 'chai'


describe('Landing page cases', () => {
    
    it('Open sign in page from landing page', async () => {
        await page.openLandingPage()
        await landingPage.clickSignInWithEmailBtn()
        await browser.pause(2000)
        expect(await signInPage.getSignInPageTitleText()).equals(assert.signInHeader)
    })

    it('Open register page from landing page', async () => {
        await page.openLandingPage()
        await landingPage.clickRegisterWithEmailBtn()
        await browser.pause(2000)
        expect(await signUpPage.getSignUpPageTitleText()).equals(assert.registerHeader)
    })
    
})