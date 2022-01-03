

const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class DiscoverPage extends Page {
    /**
     * define selectors using getter methods
     */
    get headerTitle() {
        return $('h1=Discover');
    }

}

module.exports = new DiscoverPage();
