import * as landingPage from '../pageObjects/landing.page'
import { openLandingPage } from '../pageObjects/page'
import * as signInFacebook from '../pageObjects/signInFacebook.page'
import { expect } from 'chai'
import { waitForUserProfileImageInHeader } from '../pageObjects/header.element'
import { userFacebook } from '../utils/userCredentials'
import { getDiscoverPageTitleText } from '../pageObjects/discover.page'
import { HeaderText } from '../utils/enums'


describe('Continue with Facebook', () => {

    beforeEach(async function (){
        await openLandingPage()        
    })
    
    it('Initiate Continue with Facebook and return back to landing', async () => {
        await landingPage.clickContinueWithFacebookBtn()
        await signInFacebook.waitForConsentsPopupIsVisible(6000)
        await browser.back()
        await landingPage.waitForTermsAndConditionsLinkInViewport(8000)
        expect (await landingPage.getLandingPageTitleText()).equals(HeaderText.landing)
    })

    it('Success Continue with Facebook login', async () => {
        await landingPage.clickContinueWithFacebookBtn()
        await signInFacebook.waitForConsentsPopupIsVisible(6000)
        await signInFacebook.loginOnFacebook(userFacebook.email, userFacebook.pass)
        await landingPage.waitForTermsAndConditionsLinkInViewport(8000)
        await waitForUserProfileImageInHeader(8000)
        expect (await getDiscoverPageTitleText()).equals(HeaderText.discover)
    })

})