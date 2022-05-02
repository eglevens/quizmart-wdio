import * as page from './page'


const latestQuiz = '(//div[./div[@data-cy="quizCover"]]) [1]'

const latestQuizPrice = `${latestQuiz} //div[@data-cy="desktopQuizPrice"] //div`
const latestQuizTitle = `${latestQuiz} //h2[@data-cy="quizTitle"]`
const latestQuizDesc = `${latestQuiz} //div[@data-cy="quizDescription"]`
const latestQuizQuestionCount = `${latestQuiz} //div[@data-cy="quizQuestionCount"]`
const latestQuizImage = `${latestQuiz} //div[@data-cy="quizCover"]`


//----------------ACTION----------------

export async function openMyCreatedQuizzes() {
    await page.openMyCreatedQuizPage()
    await page.waitUntilElementIsPresentByLocator(latestQuiz)
}

//----------------GET----------------

export async function isQuizImageUploaded(): Promise<boolean> {
    const attr = await (await page.getElementByLocator(latestQuizImage)).getAttribute('src') 
    return attr.length > 0 ? true : false
}

export async function getQuizPrice(): Promise<string> {
    return await page.getElementTextByLocator(latestQuizPrice)
}

export async function getQuizTitle(): Promise<string> {
    return await page.getElementTextByLocator(latestQuizTitle)
}

export async function getQuizDescription(): Promise<string> {
    return await page.getElementTextByLocator(latestQuizDesc)
}

export async function getQuizQuestionCount(): Promise<string> {
    return await page.getElementTextByLocator(latestQuizQuestionCount)
}
