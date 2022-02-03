import * as landingPage from '../pageObjects/landing.page'
import { openLandingPage } from '../pageObjects/page'
import * as signInPage from '../pageObjects/signIn.page'
import { expect } from 'chai'
import { userGoogle } from '../utils/userCredentials'
import { getDiscoverPageTitleText, waitForUserProfileImageInHeaderIsDisplayed } from '../pageObjects/discover.page'
import { HeaderText } from '../utils/enums'


describe('Continue with Google', () => {
//does not work on headless mode
    beforeEach(async function (){
        await openLandingPage()        
    })
    
    it('Initiate Continue with Google and return back to landing', async () => {
        await landingPage.clickContinueWithGoogleBtn()
        await signInPage.waitForNextEmailBtnInGoogleIsClickable(6000)
        await browser.back()
        await landingPage.waitForTermsAndConditionsLinkInViewport(8000)
        expect (await landingPage.getLandingPageTitleText()).equals(HeaderText.landing)
    })

    it('Success Continue with Google login', async () => {
        await landingPage.clickContinueWithGoogleBtn()
        await signInPage.loginOnGoogle(userGoogle.email, userGoogle.pass)
        await landingPage.waitForTermsAndConditionsLinkInViewport(8000)
        await waitForUserProfileImageInHeaderIsDisplayed(8000)
        expect (await getDiscoverPageTitleText()).equals(HeaderText.discover)
    })

})