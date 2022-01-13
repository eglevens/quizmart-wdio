import * as signInPage from "../pageObjects/signIn.page"
import * as registerPage from "../pageObjects/register.page"
import * as forgotPassPage from "../pageObjects/forgotPass.page"
import { expect } from 'chai'


describe('Navigation from sign up with email page', () => {

    beforeEach(function(){
        signInPage.openSignIn()
    })

    it('Open register page',async () => {
        await signInPage.clickCreateAccountBtn()
        expect (await registerPage.getRegisterPageTitle()).to.be.true
    })

    it('Open forgot password page',async () => {
        await signInPage.clickForgotPassBtn()
        expect (await forgotPassPage.getForgotPassPageTitle()).to.be.true
    })

})