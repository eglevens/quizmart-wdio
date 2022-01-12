import * as page from "../pageObjects/page"
import * as landingPage from "../pageObjects/landing.page"
import * as signInPage from "../pageObjects/signIn.page"


describe('Landing page cases', () => {
    
    it('Open login page from landing page', async () => {
        await page.openLanding()
        await landingPage.clickLoginWithEmailBtn()        
        //assertions do not work
        await expect(signInPage.getSignInTitle()).toBeDisplayed()
    })

})


