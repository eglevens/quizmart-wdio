import * as signInPage from "../pageObjects/signIn.page"
import * as discoverPage from "../pageObjects/discover.page"
import { expect } from 'chai'


const email = 'eglvns@telesoftas.com'
const pass = 'myPasswordIs321'
const invalidPass = 'myPasswordIs'
const unregistredEmail = 'eglvns+unregistered@telesoftas.com'
const invalidFormatEmail = 'eglvnstelesoftas.com'
const shortPass = '12345'
//---Errors------------------------------------------
const incorrectCredentialsErrorText = 'The email address or password is incorrect'
const requiredValidationErrorText = 'Required'



describe('Sign in with email from sign up page', () => {

    beforeEach(function(){
        signInPage.openSignInPage()
    })

    it('Success sign in', async () => {
        await signInPage.signInWithEmail(email, pass)
        expect (await discoverPage.getDiscoverPageTitle()).to.be.true
    })

    it('Attempt to sign in with invalid password', async() => {
        await signInPage.signInWithEmail(email, invalidPass)
        browser.pause(2000)
        expect (await signInPage.getSignInPageTitleText()).equals('Sign in')
        expect (await signInPage.getIncorrectCredentialsErrorText()).equals(incorrectCredentialsErrorText)
    })

    it('Attempt to sign in with non registered email', async() => {
        await signInPage.signInWithEmail(unregistredEmail, invalidPass)
        expect (await signInPage.getSignInPageTitleText()).equals('Sign in')
        expect (await signInPage.getIncorrectCredentialsErrorText()).equals(incorrectCredentialsErrorText)
    })

    // it('Validation error with invalid email format and too short password', async () => {
    //     await signInPage.signInWithEmail(invalidFormatEmail, shortPass)
    //     expect (await signInPage.getEmailFormatValidationError()).to.be.true
    //     expect (await signInPage.getPasswordLengthValidationError()).to.be.true
    // })

    it('Validation error with empty email & password', async () => {
        await signInPage.clickSignInBtn()
        expect (await signInPage.getEmailValidationErrorText()).equals(requiredValidationErrorText)
        expect (await signInPage.getPassValidationErrorText()).equals(requiredValidationErrorText)
    })


})