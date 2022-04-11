import * as landingPage from '../pageObjects/landing.page'
import * as page from '../pageObjects/page'
import * as enums from '../utils/enums'
import * as userCredentials from '../utils/userCredentials'
import { expect } from 'chai'


describe('Landing page cases', () => {

    beforeEach(async function (){
        await page.openLandingPage()
    })

    
    it('Open sign in page from landing page', async () => {
        await page.clickOnButton(enums.Button.SignInWithEmail)
        expect (await page.getPageHeaderTextForGuestAfterBtnIsVisible(enums.Button.SignIn)).equals(enums.Header.SignIn)
    })

    it('Open register page from landing page', async () => {
        await landingPage.clickRegisterWithEmailBtnFromRegisterTab()
        expect (await page.getPageHeaderTextForGuestAfterBtnIsVisible(enums.Button.Register)).equals(enums.Header.Register)
    })

    it('Open Terms and conditions page in new tab from landing page', async () => {
        await page.clickOnLink(enums.Link.TermsAndConditions)
        await browser.switchWindow('terms-and-conditions/')
        expect (await page.getPageHeaderText()).equals(enums.Header.TermsAndConditions)
    })
    
})