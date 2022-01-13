import * as signInPage from "../pageObjects/signIn.page"
import * as registerPage from "../pageObjects/register.page"
import { expect } from 'chai'


describe('Navigation from register with email page', () => {

    beforeEach(function(){
        registerPage.openRegisterPage()
    })

    it('Open sign in page',async () => {
        await registerPage.clickSignInBtn()
        expect (await signInPage.getSignInPageTitle()).to.be.true
    })

})