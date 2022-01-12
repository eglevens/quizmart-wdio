import * as signInPage from "../pageObjects/signIn.page"

const email = 'eglvns@telesoftas.com'
const pass = 'myPasswordIs321'
const invalidPass = 'myPasswordIs'
const unregistredEmail = 'eglvns+unregistered@telesoftas.com'

describe('Login with email from sign up page', () => {


    beforeEach(function(){
        signInPage.openSignIn()
    })


    it('Success login', async () => {
        await signInPage.login(email, pass)
        expect(browser).toHaveUrlContaining('discover')
        
    })

    it("Attempt to login with invalid password", async() => {
        await signInPage.login(email, invalidPass)
        //assertions do not work
        await expect(signInPage.getSignInTitle()).toBeDisplayed()
        await expect(signInPage.getIncorrectCredentialsError()).toBeDisplayed()
    })

    it("Attempt to login with non registered email", async() => {
        await signInPage.login(unregistredEmail, invalidPass)
        //assertions do not work
        await expect(signInPage.getSignInTitle()).toBeDisplayed()
        await expect(signInPage.getIncorrectCredentialsError()).toBeDisplayed()
    })

})


