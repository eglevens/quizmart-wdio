import * as signInPage from "../pageObjects/signIn.page"
import * as discoverPage from "../pageObjects/discover.page"
import * as registerPage from "../pageObjects/register.page"
import * as forgotPassPage from "../pageObjects/forgotPass.page"
import { expect } from 'chai'


const email = 'eglvns@telesoftas.com'
const pass = 'myPasswordIs321'
const invalidPass = 'myPasswordIs'
const unregistredEmail = 'eglvns+unregistered@telesoftas.com'
const invalidFormatEmail = 'eglvnstelesoftas.com'
const shortPass = '12345'


describe('Login with email from sign up page', () => {

    beforeEach(function(){
        signInPage.openSignIn()
    })

    it('Success login', async () => {
        await signInPage.signInWithEmail(email, pass)
        expect (await discoverPage.getDiscoverPageTitle()).to.be.true
    })

    it('Attempt to login with invalid password', async() => {
        await signInPage.signInWithEmail(email, invalidPass)
        expect (await signInPage.getSignInPageTitle()).to.be.true
        expect (await signInPage.getIncorrectCredentialsError()).to.be.true
    })

    it('Attempt to login with non registered email', async() => {
        await signInPage.signInWithEmail(unregistredEmail, invalidPass)
        expect (await signInPage.getSignInPageTitle()).to.be.true
        expect (await signInPage.getIncorrectCredentialsError()).to.be.true
    })

    it('Validation error with invalid email format and too short password', async () => {
        await signInPage.signInWithEmail(invalidFormatEmail, shortPass)
        expect (await signInPage.getEmailFormatValidationError()).to.be.true
        expect (await signInPage.getPasswordLengthValidationError()).to.be.true
    })

    it('Validation error with empty email & password', async () => {
        await signInPage.clickSignInBtn()
        expect (await signInPage.getEmailRequiredValidationError()).to.be.true
        expect (await signInPage.getPassRequiredValidationError()).to.be.true
    })

    it('Open register page from sign in page',async () => {
        await signInPage.clickCreateAccountBtn()
        expect (await registerPage.getRegisterPageTitle()).to.be.true
    })

    it('Open forgot password page from sign in page',async () => {
        await signInPage.clickForgotPassBtn()
        expect (await forgotPassPage.getForgotPassPageTitle()).to.be.true
    })

})