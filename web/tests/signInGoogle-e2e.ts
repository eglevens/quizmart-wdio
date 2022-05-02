import * as landingPage from '../pageObjects/landing.page'
import * as page from '../pageObjects/page'
import { expect } from 'chai'
import * as api from '../utils/api'
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
        await landingPage.loginOnGoogle()
        await page.waitUntilSortButtonIsDisplayed(9000)
        expect (await page.getPageHeaderTextAfterLogin()).equals(enums.Header.Discover)
    })

    afterEach(async function() {
        await api.takeScreenshot(this)
    })

})