import * as page from '../pageObjects/page'
import * as landingPage from '../pageObjects/landing.page'
import * as signInPage from '../pageObjects/signIn.page'
import * as registerPage from '../pageObjects/register'
import { HeaderText } from '../utils/enums'
import { expect } from 'chai'


describe('Landing page cases', () => {
    
    it('Open sign in page from landing page', async () => {
        await page.openLandingPage()
        await landingPage.clickSignInWithEmailBtn()
        await signInPage.waitForSignInFormBtn(6000)
        expect(await signInPage.getSignInPageTitleText()).equals(HeaderText.signIn)
    })

    it('Open register page from landing page', async () => {
        await page.openLandingPage()
        await landingPage.clickRegisterWithEmailBtn()
        await registerPage.waitForRegisterFormBtn()
        expect(await registerPage.getRegisterPageTitleText()).equals(HeaderText.register)
    })
    
})