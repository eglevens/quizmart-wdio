import { openLandingPage } from '../pageObjects/page'
import * as landingPage from '../pageObjects/landing.page'
import { waitForSignInFormBtnInDOM, getSignInPageTitleText} from '../pageObjects/signIn.page'
import { waitForRegisterFormBtnInDOM, getRegisterPageTitleText } from '../pageObjects/register'
import { HeaderText } from '../utils/enums'
import { expect } from 'chai'


describe('Landing page cases', () => {

    beforeEach(async function (){
        await openLandingPage()
    })
    
    it('Open sign in page from landing page', async () => {
        await landingPage.clickSignInWithEmailBtn()
        await waitForSignInFormBtnInDOM()
        expect(await getSignInPageTitleText()).equals(HeaderText.signIn)
    })

    it('Open register page from landing page', async () => {
        await landingPage.clickRegisterWithEmailBtn()
        await waitForRegisterFormBtnInDOM()
        expect(await getRegisterPageTitleText()).equals(HeaderText.register)
    })
    
})