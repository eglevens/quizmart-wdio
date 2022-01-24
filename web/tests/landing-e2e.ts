import * as landingPage from '../pageObjects/landing.page'
import { openLandingPage } from '../pageObjects/page'
import { waitForSignInFormBtnInDOM, getSignInPageTitleText} from '../pageObjects/signIn.page'
import { waitForRegisterFormBtnInDOM, getRegisterPageTitleText } from '../pageObjects/register'
import { isTermsAndConditionsTitleTextInDOM, waitForTermsAndConditionsPageTitleText } from '../pageObjects/termsAndConditions.page'
import { HeaderText } from '../utils/enums'
import { expect } from 'chai'


describe('Landing page cases', () => {

    beforeEach(async function (){
        await openLandingPage()
    })
    
    it('Open sign in page from landing page', async () => {
        await landingPage.clickSignInWithEmailBtn()
        await waitForSignInFormBtnInDOM()
        expect (await getSignInPageTitleText()).equals(HeaderText.signIn)
    })

    it('Open register page from landing page', async () => {
        await landingPage.clickRegisterWithEmailBtn()
        await waitForRegisterFormBtnInDOM()
        expect (await getRegisterPageTitleText()).equals(HeaderText.register)
    })

    it('Open Terms and conditions page in new tab from landing page', async () => {
        await landingPage.clickTermsAndConditionsLink()
        await browser.switchWindow('terms-and-conditions/')
        await waitForTermsAndConditionsPageTitleText()
        expect (await isTermsAndConditionsTitleTextInDOM()).to.be.true
    })
    
})