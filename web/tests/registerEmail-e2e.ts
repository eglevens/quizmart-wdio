import * as registerPage from "../pageObjects/register.page"
import { expect } from 'chai'
import { OperationCanceledException } from "typescript"


const email = 'eglvns@telesoftas.com'
const pass = 'myPasswordIs321'
const invalidFormatEmail = 'eglvnstelesoftas.com'
const shortPass = '12345'


describe('Register with email from register page', () => {

    beforeEach(function(){
        registerPage.openRegisterPage()
    })

    it('Success registration without newsletter', async () => {
    })

    it('Success registration with newsletter', async () => {
    })

    it('Attempt to register with already registered email', async() => {
        await registerPage.registerWithEmail(email, pass, pass)
        expect (await registerPage.getUserAlreadyExistsError()).to.be.true
    })

    it('Validation error with invalid email format, too short password and not matching repeat password', async () => {
        await registerPage.registerWithEmail(invalidFormatEmail, shortPass, shortPass)
        expect (await registerPage.getEmailFormatValidationError()).to.be.true
        expect (await registerPage.getPasswordLengthValidationError()).to.be.true
        expect (await registerPage.getNotMatchingRepeatPasswordValidationError()).to.be.true
    })

    it('Validation error with empty email & passwords', async () => {
        await registerPage.clickSignUpBtn()
        expect (await registerPage.getEmailRequiredValidationError()).to.be.true
        expect (await registerPage.getPassRequiredValidationError()).to.be.true
        expect (await registerPage.getRepeatPassRequiredValidationError()).to.be.true
    })

})