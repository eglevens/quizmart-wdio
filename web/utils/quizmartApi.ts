import chai = require('chai')
import chaiHttp = require('chai-http')
import { expect } from 'chai'
chai.use(chaiHttp)

import * as discoverPage from '../pageObjects/discover.page'
import * as localStr from './localStr'


const apiBaseUrl = 'https://staging-api.quizmart.io/api/v1'


export async function getQuizIds(email: string, password: string): Promise<string> {
    const token = await localStr.getLocalStorageValue('auth_header')
    const response = await chai.request(apiBaseUrl)
        .get('/created-collections')
        .set('Authorization', 'Bearer ' + token)
    expect(response.status).equals(200)
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
    console.log (response.body.isSubscribedToNewsletter + 'user is subscribed????')
    return response.body.isSubscribedToNewsletter
}


export async function loginToQuizmartApp(email: string, password: string) {
    const response = await chai.request(apiBaseUrl)
        .post('/auth/login')
        .send({ 'email': email, 'password': password })

    await browser.url(`https://staging-app.quizmart.io/auth#${response.body.accessToken}$$${response.body.refreshToken}$$`)
    await discoverPage.waitForSortButtonIsDisplayed(8000)
}