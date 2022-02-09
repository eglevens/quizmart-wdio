import * as landingPage from '../pageObjects/landing.page'
import * as page from '../pageObjects/page'
import * as discoverPage from '../pageObjects/discover.page'
import { expect } from 'chai'
import { userGoogle } from '../utils/userCredentials'
import * as Enums from '../utils/enums'


describe('Continue with Google', () => {
//does not work on headless mode
    beforeEach(async function (){
        await landingPage.openGoogle() 
    })
    
    it('Initiate Continue with Google and return back to landing', async () => {
        await browser.back()
        await page.waitUntilButtonByTextIsVisibleInViewport(Enums.Button.ContinueWithGoogle, 6000)
        expect (await page.getPageHeaderText()).equals(Enums.Header.Landing)
    })

    it('Success Continue with Google login', async () => {
        await landingPage.loginOnGoogle(userGoogle.email, userGoogle.pass)
        await discoverPage.waitForSortButtonIsDisplayed(8000)
        expect (await page.getPageHeaderText()).equals(Enums.Header.Discover)
    })

})