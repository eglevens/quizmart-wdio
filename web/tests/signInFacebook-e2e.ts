import *  as landingPage from '../pageObjects/landing.page'
import * as page from '../pageObjects/page'
import * as discoverPage from '../pageObjects/discover.page'
import { expect } from 'chai'
import { userFacebook } from '../utils/userCredentials'
import * as enums from '../utils/enums'


describe('Continue with Facebook', () => {
    beforeEach(async function (){
        await landingPage.openFacebook()
    })
    
    it('Return back from facebook to landing', async () => {
        await browser.back()
        expect (await page.getPageHeaderTextForGuestAfterBtnIsVisible(enums.Button.ContinueWithFacebook, 6000)).equals(enums.Header.Landing)
    })

    it('Success Facebook login & redirection to discover', async () => {
        await landingPage.loginOnFacebook(userFacebook.email, userFacebook.pass)
        await discoverPage.waitForSortButtonIsDisplayed(9000)
        expect (await page.getPageHeaderTextAfterLogin()).equals(enums.Header.Discover)
    })

})