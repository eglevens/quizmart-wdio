import * as signInPage from "../pageObjects/signIn.page"
import * as discoverPage from "../pageObjects/discover.page"
import { expect } from 'chai'


const email = 'eglvns@telesoftas.com'
const pass = 'myPasswordIs321'
const invalidPass = 'myPasswordIs'
const unregistredEmail = 'eglvns+unregistered@telesoftas.com'
const invalidFormatEmail = 'eglvnstelesoftas.com'
const shortPass = Math.random().toString(16).slice(2, 7)
const longPass = Math.random().toString(16).repeat(10)
//---Errors------------------------------------------
const incorrectCredentialsErrorText = 'The email address or password is incorrect'
const requiredValidationErrorText = 'Required'
const emailValidationErrorText = 'Must be valid email'
const passTooShortValidationErrorText = 'Password must be at least of 6 characters in length'
const passTooLongValidationErrorText = 'Password must be at most of 100 characters in length'




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

    it('Validation error with invalid email format', async () => {
        await signInPage.fillEmailInputAndLoseFocus(invalidFormatEmail)
        expect (await signInPage.getEmailValidationErrorText()).equals(emailValidationErrorText)
    })

    it('Validation error with too short and too long password', async () => {
        await signInPage.fillPassInputAndLoseFocus(shortPass)
        console.log('my short pass: ' + shortPass)
        expect (await signInPage.getPassValidationErrorText()).equals(passTooShortValidationErrorText)
        await browser.refresh()
        await signInPage.fillPassInputAndLoseFocus(longPass)
        console.log('my long pass: ' + longPass)
        expect (await signInPage.getPassValidationErrorText()).equals(passTooLongValidationErrorText)
    })

    it('Validation error with empty email & password', async () => {
        await signInPage.clickSignInBtn()
        expect (await signInPage.getEmailValidationErrorText()).equals(requiredValidationErrorText)
        expect (await signInPage.getPassValidationErrorText()).equals(requiredValidationErrorText)
    })


})