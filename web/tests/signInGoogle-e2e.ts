import * as landingPage from '../pageObjects/landing.page'
import { openLandingPage } from '../pageObjects/page'
import * as signInGoogle from '../pageObjects/signInGoogle'
import { expect } from 'chai'
import { waitForUserProfileImageInHeader } from '../pageObjects/header.element'
import { userGoogle } from '../utils/userCredentials'
import { getDiscoverPageTitleText } from '../pageObjects/discover.page'
import { HeaderText } from '../utils/enums'


describe('Continue with Google', () => {

    beforeEach(async function (){
        await openLandingPage()        
    })
    
    it('Initiate Continue with Google and return back to landing', async () => {
        await landingPage.clickContinueWithGoogleBtn()
        await signInGoogle.waitForNextBtnInGoogleIsClickable()
        await browser.back()
        await landingPage.waitForTermsAndConditionsLinkInViewport()
        expect (await landingPage.isTermsAndConditionsLinkDisplayed()).to.be.true
    })

    it('Success Continue with Google login', async () => {
        await landingPage.clickContinueWithGoogleBtn()
        await signInGoogle.continueWithGoogle(userGoogle.email, userGoogle.pass)
        await landingPage.waitForTermsAndConditionsLinkInViewport(8000)
        await waitForUserProfileImageInHeader(8000)
        expect (await getDiscoverPageTitleText()).equals(HeaderText.discover)
    })

})