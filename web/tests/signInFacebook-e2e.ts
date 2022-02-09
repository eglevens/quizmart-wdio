import *  as landingPage from '../pageObjects/landing.page'
import * as page from '../pageObjects/page'
import * as discoverPage from '../pageObjects/discover.page'
import { expect } from 'chai'
import { userFacebook } from '../utils/userCredentials'
import * as Enums from '../utils/enums'


describe('Continue with Facebook', () => {
    beforeEach(async function (){
        await landingPage.openFacebook()
    })
    
    it('Return back from facebook to landing', async () => {
        await browser.back()
        await page.waitUntilButtonByTextIsVisibleInViewport(Enums.Button.ContinueWithFacebook, 6000)
        expect (await page.getPageHeaderText()).equals(Enums.Header.Landing)
    })

    it('Success Facebook login & redirection to discover', async () => {
        await landingPage.loginOnFacebook(userFacebook.email, userFacebook.pass)
        await discoverPage.waitForSortButtonIsDisplayed(8000)
        expect (await page.getPageHeaderText()).equals(Enums.Header.Discover)
    })

})