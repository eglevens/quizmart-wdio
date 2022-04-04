import * as landingPage from '../pageObjects/landing.page'
import * as page from '../pageObjects/page'
import * as discoverPage from '../pageObjects/discover.page'
import { expect } from 'chai'
import { userGoogle } from '../utils/userCredentials'
import * as enums from '../utils/enums'


describe('Continue with Google', () => {
    beforeEach(async function (){
        await landingPage.openGoogle() 
    })
    
    it('Initiate Continue with Google and return back to landing', async () => {
        await browser.back()
        expect (await page.getPageHeaderTextForGuestAfterBtnIsVisible(enums.Button.ContinueWithGoogle, 6000)).equals(enums.Header.Landing)
    })

    it('Success Continue with Google login', async () => {
        await landingPage.loginOnGoogle(userGoogle.email, userGoogle.pass)
        expect (await page.getPageHeaderTextAfterLogin()).equals(enums.Header.Discover)
    })

})