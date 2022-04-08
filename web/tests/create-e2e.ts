import * as page from '../pageObjects/page'
import * as enums from '../utils/enums'
import * as createPage from '../pageObjects/create.page'
import * as validations from '../utils/validations'
import * as myQuizzPage from '../pageObjects/myQuizz.page'
import { expect } from 'chai'
import { user1 } from '../utils/userCredentials'
import * as api from '../utils/api'


describe('Quiz creation cases', () => {

    beforeEach(async function () {
        await api.loginToQuizmartApp(user1.email, user1.pass)
        await page.clickOnLink(enums.Link.Create)
    })

    it.only('Cancel redirects to discover', async () => {
        await page.clickOnButton(enums.Button.Cancel)
        expect(await page.getPageHeaderTextAfterLogin()).equals(enums.Header.Discover)
    })

    it('Required quiz title, question and answer, Title characters left, tags left, Too many tags added', async () => {
        await page.clickOnButton(enums.Button.SaveQuiz)
        expect(await createPage.isInputValidationTextExist(validations.Form.QuizTitleRequired)).to.be.true
        expect(await createPage.isInputValidationTextExist(validations.Form.QuizQuestionRequired)).to.be.true
        expect(await createPage.isInputValidationTextExist(validations.Form.QuizAnswerRequired)).to.be.true

        await browser.refresh()

        await createPage.fillQuizTitle()
        expect(await createPage.getTitleCharsLeft()).equals('236')
        await createPage.fillInputWithtags(5)
        expect(await createPage.getTagsOutOf()).equals('5/20')

        await browser.refresh()

        await createPage.fillInputWithtags(21)
        expect(await createPage.getTagsOutOf()).equals('21/20')
        expect(await createPage.isInputValidationTextExist(validations.Form.QuizTooManyTags)).to.be.true
    })

    it('Create quiz with open-ended question and verify it exists in created collections', async () => {
        await createPage.fillQuizWithOpenEndedQuestion()
        await myQuizzPage.openMyCreatedQuizzes()
        expect(await myQuizzPage.isQuizImageUploaded()).to.be.true
        expect(await myQuizzPage.getQuizPrice()).equals('Free')
        expect(await myQuizzPage.getQuizTitle()).equals(enums.QuizCreation.Title)
        expect(await myQuizzPage.getQuizDescription()).equals(enums.QuizCreation.Description)
        expect(await myQuizzPage.getQuizQuestionCount()).equals('1 question')
    })

    afterEach(async function () {
        await api.takeScreenshot(this)
    })

    after(async function () {
        await api.deleteQuiz(user1.email, user1.pass)
    })

})