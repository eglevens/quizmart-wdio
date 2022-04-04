import chai = require('chai')
import chaiHttp = require('chai-http')
import { expect } from 'chai'
chai.use(chaiHttp)

import * as discoverPage from '../pageObjects/discover.page'


const apiBaseUrl = 'https://staging-api.quizmart.io/api/v1'


export async function login(email: string, password: string) {
    const response = await chai.request(apiBaseUrl)
        .post('/auth/login')
        .send({ 'email': email, 'password': password })
    return response.body.accessToken
}

export async function getQuizIds(email: string, password: string) {
    const response = await chai.request(apiBaseUrl)
        .get('/created-collections/')
        .set('Authorization', 'Bearer ' + await login(email, password))
    expect(response.status).equals(200)
    return response.body.quizzes.data[0].id
}

export async function deleteQuiz(email: string, password: string) {
    const quizId = await getQuizIds(email, password)
    const response = await chai.request('https://staging-api.quizmart.io')
        .delete(`/api/v1/quizzes/${quizId}`)
        .set('Authorization', 'Bearer ' + await login(email, password))
    expect(response.status).equals(204)
}


export async function loginToQuizmartApp(email: string, password: string) {
    const response = await chai.request(apiBaseUrl)
        .post('/auth/login')
        .send({ 'email': email, 'password': password })

    await browser.url(`https://staging-app.quizmart.io/auth#${response.body.accessToken}$$${response.body.refreshToken}$$`)
    await discoverPage.waitForSortButtonIsDisplayed(8000)
}  