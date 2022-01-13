import * as signInPage from "../pageObjects/signIn.page"
import * as discoverPage from "../pageObjects/discover.page"


const email = 'eglvns@telesoftas.com'
const pass = 'myPasswordIs321'
const invalidPass = 'myPasswordIs'
const unregistredEmail = 'eglvns+unregistered@telesoftas.com'
import { expect } from 'chai'


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
        expect(await signInPage.getSignInPageTitle()).equals('Sign in')
        expect(await signInPage.getIncorrectCredentialsError()).equals("The email address or password is incorrect")
    })

    it("Attempt to login with non registered email", async() => {
        await signInPage.loginWithEmail(unregistredEmail, invalidPass)
        expect(await signInPage.getSignInPageTitle()).equals('Sign in')
        expect(await signInPage.getIncorrectCredentialsError()).equals("The email address or password is incorrect")
    })

    it("Login button disabled with invalid email format and error is shown", async () => {
        
    })

    it("Login button disabled with too short password and error is shown", async () => {
        
    })

})