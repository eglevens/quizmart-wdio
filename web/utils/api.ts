import chai = require('chai')
import chaiHttp = require('chai-http')
import { expect } from 'chai'
chai.use(chaiHttp)
import path = require('path')
import * as page from '../pageObjects/page'

import * as localStr from './localStr'
import { Context as MochaContext } from 'mocha'


const apiBaseUrl = 'https://staging-api.quizmart.io/api/v1'


export async function takeScreenshot(testContext: MochaContext): Promise<void> {
    const test = testContext.currentTest!
    const title = test.title.split(' ').join('-')
    const dir = `../../screenshots/${test.state}/${test.state}-${title}.png`
    await browser.saveScreenshot(path.join(__dirname, `${dir}`))
}

export async function getQuizIds(email: string, password: string): Promise<string> {
    const token = await localStr.getLocalStorageValue('auth_header')
    const response = await chai.request(apiBaseUrl)
        .get('/created-collections')
        .set('Authorization', 'Bearer ' + token)
    expect(response.status).equals(200)
    expect(response.body.quizzes.data[0].id).is.not.undefined

    return response.body.quizzes.data[0].id
}

export async function deleteQuiz(email: string, password: string): Promise<void> {
    const token = await localStr.getLocalStorageValue('auth_header')
    const quizId = await getQuizIds(email, password)
    const response = await chai.request(apiBaseUrl)
        .delete(`/quizzes/${quizId}`)
        .set('Authorization', 'Bearer ' + token)
    expect(response.status).equals(204)
}

export async function deleteAccount(): Promise<void> {
    const token = await localStr.getLocalStorageValue('auth_header')
    const response = await chai.request(apiBaseUrl)
        .delete('/user')
        .set('Authorization', 'Bearer ' + token)
    expect(response.status).equals(204)
}

export async function isUserSubscribedToNewsletter(): Promise<boolean> {
    const token = await localStr.getLocalStorageValue('auth_header')
    const response = await chai.request(apiBaseUrl)
        .get('/user')
        .set('Authorization', 'Bearer ' + token)
    expect(response.status).equals(200)

    return response.body.isSubscribedToNewsletter
}

export async function isUserEmailVerified(): Promise<boolean> {
    const token = await localStr.getLocalStorageValue('auth_header')
    const response = await chai.request(apiBaseUrl)
        .get('/user')
        .set('Authorization', 'Bearer ' + token)
    expect(response.status).equals(200)

    return response.body.emailVerified
}

export async function loginToQuizmartApp(email: string, password: string) {
    const response = await chai.request(apiBaseUrl)
        .post('/auth/login')
        .send({ 'email': email, 'password': password })

    await browser.url(`https://staging-app.quizmart.io/auth#${response.body.accessToken}$$${response.body.refreshToken}$$`)
    await page.waitUntilSortButtonIsDisplayed(4000)
}

export async function abortRequest(url: string) {
    (await browser.mock(apiBaseUrl + url)).abort('Failed')
}


export async function mockWalletResponse() {

    (await browser.mock(apiBaseUrl + '/wallet/balance', {method: 'get'})).respond(
        {
            balance: 1400.0000,
            purchased: 200.0000,
            earned: 100.0,
            spent: 50.0
        }
    )
}

export async function download(filename, text?) {

    

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + 
    encodeURIComponent(text));
    element.setAttribute('download', filename);
   
     element.style.display = 'none';
     document.body.appendChild(element);
   
     element.click();
   
     document.body.removeChild(element);
   }