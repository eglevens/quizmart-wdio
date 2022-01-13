import * as page from "../pageObjects/page"
import * as landingPage from "../pageObjects/landing.page"
import * as signInPage from "../pageObjects/signIn.page"
import * as registerPage from "../pageObjects/register.page"
import { expect } from 'chai'


describe('Landing page cases', () => {
    
    it('Open login page from landing page', async () => {
        await page.openLanding()
        await landingPage.clickLoginWithEmailBtn()        
        expect(await signInPage.getSignInPageTitle()).to.be.true
    })

    it('Open register page from landing page', async () => {
        await page.openLanding()
        await landingPage.clickRegisterTab()
        await landingPage.clickRegisterWithEmailBtn()
        expect(await registerPage.getRegisterPageTitle()).to.be.true
    })
    
})


