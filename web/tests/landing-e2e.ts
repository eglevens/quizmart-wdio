import * as page from "../pageObjects/page"
import * as landingPage from "../pageObjects/landing.page"
import * as signInPage from "../pageObjects/signIn.page"
import { expect } from 'chai'


describe('Landing page cases', () => {
    
    it('Open login page from landing page', async () => {
        await page.openLanding()
        await landingPage.clickLoginWithEmailBtn()        
        expect(await signInPage.getSignInTitle()).equals('Sign in')
    })
})


