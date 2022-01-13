import * as page from './page'


const discoverPageTitle = '//h1[text()="Discover"]'


export async function getDiscoverPageTitle(): Promise <boolean> {
    return await page.elementPresentByLocator(discoverPageTitle)
}