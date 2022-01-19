import * as page from './page'


const discoverPageTitle = 'h1'


export async function getDiscoverPageTitleText(): Promise<string> {
    return await page.getElementTextByLocator(discoverPageTitle)
}