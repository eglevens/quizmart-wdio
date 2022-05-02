import chai = require('chai')
import chaiHttp = require('chai-http')
import { expect } from 'chai'
chai.use(chaiHttp)
import path = require('path')
import * as page from '../pageObjects/page'

import * as localStr from './localStr'
import * as defaultCredentials from '../../userCredentials.json'
import { Context as MochaContext } from 'mocha'


const apiBaseUrl = 'https://staging-api.quizmart.io/api/v1'


export async function takeScreenshot(testContext: MochaContext): Promise<void> {
    const test = testContext.currentTest!
    const title = test.title.split(' ').join('-')
    const dir = `../../screenshots/${test.state}/${test.state}-${title}.png`
    await browser.saveScreenshot(path.join(__dirname, `${dir}`))
}

export async function getQuizIds(): Promise<string> {
    const token = await localStr.getLocalStorageValue('auth_header')
    const response = await chai.request(apiBaseUrl)
        .get('/created-collections')
        .set('Authorization', 'Bearer ' + token)
    expect(response.status).equals(200)
    expect(response.body.quizzes.data[0].id).is.not.undefined

    return response.body.quizzes.data[0].id
}

export async function deleteQuiz(): Promise<void> {
    const token = await localStr.getLocalStorageValue('auth_header')
    const quizId = await getQuizIds()
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

export async function loginToQuizmartApp(email?: string, password?: string) {
    const response = await chai.request(apiBaseUrl)
        .post('/auth/login')
        .send({ 'email': email || defaultCredentials.email, 'password': password || defaultCredentials.pass})

    await browser.url(`https://staging-app.quizmart.io/auth#${response.body.accessToken}$$${response.body.refreshToken}$$`)
    await page.waitUntilSortButtonIsDisplayed()
}