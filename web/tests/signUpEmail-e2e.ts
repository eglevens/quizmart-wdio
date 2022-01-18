import * as signUpPage from "../pageObjects/signUp.page"
import * as signInPage from "../pageObjects/signIn.page"
import { expect } from 'chai'


const email = 'eglvns@telesoftas.com'
const pass = 'myPasswordIs321'
const invalidFormatEmail = 'eglvnstelesoftas.com'
const shortPass = '12345'


describe('Sign up with email from sign up page', () => {

    beforeEach(function () {
        signUpPage.openSignUpPage()
    })

    it('Success sign up without newsletter', async () => {
    })

    it('Success sign up with newsletter', async () => {
    })

    it('Attempt to sign up with already registered email', async () => {
    })

    it('Validation error with invalid email format, too short password and not matching repeat password', async () => {
    })

    it('Validation error with empty email & passwords', async () => {
    })

    it('Open sign in page from sign up page', async () => {
        await signUpPage.clickSignInBtn()
        await browser.pause(2000)
        expect(await signInPage.getSignInPageTitleText()).equals('Sign in')
    })

})