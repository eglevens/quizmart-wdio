import * as registerPage from "../pageObjects/register.page"
import { expect } from 'chai'


const email = 'eglvns@telesoftas.com'
const pass = 'myPasswordIs321'
const invalidPass = 'myPasswordIs'
const unregistredEmail = 'eglvns+unregistered@telesoftas.com'
const invalidFormatEmail = 'eglvnstelesoftas.com'
const shortPass = '12345'


describe('Register with email from register page', () => {

    beforeEach(function(){
        registerPage.openSignUp()
    })

    it('Success registration without newsletter', async () => {
    })

    it('Success registration with newsletter', async () => {
    })

    it('Attempt to register with already registered email', async() => {
    })

    it('Validation error with invalid email format and too short password', async () => {
    })

    it('Validation error with not matching password', async () => {
    })

    it('Validation error with empty email & passwords', async () => {
    })

})