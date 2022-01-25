import * as page from './page'


const discoverPageTitle = '//h1'

const headerAccountImage = '(//button/div)[1]'

//----------------GET----------------

export async function getDiscoverPageTitleText(): Promise<string> {
    return await page.getElementTextByLocator(discoverPageTitle)
}