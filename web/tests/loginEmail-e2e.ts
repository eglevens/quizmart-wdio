import * as signInPage from "../pageObjects/signIn.page"

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
        //expect(await signInPage.getSignInTitle).not.to.ne
        //expect(browser).toHaveUrlContaining('discover')  
    })

    it("Attempt to login with invalid password", async() => {
        await signInPage.loginWithEmail(email, invalidPass)
        expect(await signInPage.getSignInTitle()).equals('Sign in')
        expect(await signInPage.getIncorrectCredentialsError()).equals("The email address or password is incorrect")
    })

    it("Attempt to login with non registered email", async() => {
        await signInPage.loginWithEmail(unregistredEmail, invalidPass)
        expect(await signInPage.getSignInTitle()).equals('Sign in')
        expect(await signInPage.getIncorrectCredentialsError()).equals("The email address or password is incorrect")
    })

})


