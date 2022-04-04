import * as page from './page'
import * as api from '../utils/quizmartApi'
import * as enums from '../utils/enums'
import path = require('path')

const charsLeft = '//div[./input[@name = "title"]] //div'
const tagsOutOf = '//div[./input[@name = "tags"]] //div[last()]'
const imageUploadInput = '//input[@id="file-upload-QuizCover"]'
const languageSelector = '//input[@value="English"]'
const ltLanguage = '//button[@value="lt"]'

const filePath = path.join(__dirname, '../../resources/img/quizImg.jpg')


//----------------ACTION----------------

export async function loginAndOpenCreatePage(email: string, password: string) {
    await api.loginToQuizmartApp(email, password)
    await page.openCreatePage()
}

export async function fillQuizTitle() {
    page.fillInputWithValue(enums.Input.QuizCreationTitle, enums.QuizCreation.Title)
}

export async function fillInputWithtags(length: number) {
    const quizTags = arrayGenerator(length)
    for (const tag of quizTags) {
        await page.fillInputWithValue(enums.Input.QuizCreationTags, tag)
        await page.clickOnButton('Add')
    }
}

export async function fillQuizWithOpenEndedQuestion() {
    await fillQuizTitle()
    await page.sendValueByLocator(imageUploadInput, filePath)
    await page.fillInputWithValue(enums.Input.QuizCreationDescription, enums.QuizCreation.Description)
    await page.fillInputWithValue(enums.Input.QuizCreationTags, enums.QuizCreation.Tags)
    await page.clickOnButton(enums.Button.Add)
    await page.clickByLocator(languageSelector)
    await page.waitUntilElementIsClickableByLocator(ltLanguage)
    await page.clickByLocator(ltLanguage)
    await page.fillInputWithValue(enums.Input.QuizCreationQuestion, enums.QuizCreation.Question)
    await page.fillInputWithValue(enums.Input.QuizCreationAnswer, enums.QuizCreation.Answer)
    await page.clickOnButton(enums.Button.SaveQuiz)
    await page.waitUntilGenericElementByTextIsPresent(enums.Messages.QuizCreated, 3000)
}

//----------------GET----------------

export async function isInputValidationTextExist(validationError: string): Promise<boolean> {
    return await page.elementPresentByElementText(validationError)
}

export async function getTitleCharsLeft(): Promise<string> {
    return await page.getElementTextByLocator(charsLeft)
}

export async function getTagsOutOf(): Promise<string> {
    return await page.getElementTextByLocator(tagsOutOf)
}



//----------------HELPERS----------------

function arrayGenerator(length: number): string[] {
    const tags = [...Array(length)].map(() => {
        const randomStr = 'abcdefghijklmnopqrstuvwxyz'.split('').sort(() => .5 - Math.random()).join('')
        return randomStr.slice(0, Math.random() * 26 + 2)
    })
    return tags
}