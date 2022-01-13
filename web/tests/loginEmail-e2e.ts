import * as signInPage from "../pageObjects/signIn.page"
import * as discoverPage from "../pageObjects/discover.page"
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
        await signInPage.loginWithEmail(email, pass)
        expect (await discoverPage.getDiscoverPageTitle()).equals("Discover")
    })

    it("Attempt to login with invalid password", async() => {
        await signInPage.loginWithEmail(email, invalidPass)
        expect (await signInPage.getSignInPageTitle()).equals('Sign in')
        expect (await signInPage.getIncorrectCredentialsError()).equals("The email address or password is incorrect")
    })

    it("Attempt to login with non registered email", async() => {
        await signInPage.loginWithEmail(unregistredEmail, invalidPass)
        expect (await signInPage.getSignInPageTitle()).equals('Sign in')
        expect (await signInPage.getIncorrectCredentialsError()).equals("The email address or password is incorrect")
    })

    it("Validation error with invalid email format and too short password", async () => {
        await signInPage.loginWithEmail(invalidFormatEmail, shortPass)
        expect (await signInPage.getEmailFormatValidationError()).equals("Must be valid email")
        expect (await signInPage.getPasswordlengthValidationError()).equals("Password must be at least of 6 characters in length")
    })

})