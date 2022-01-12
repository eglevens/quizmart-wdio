import * as LandingPage from "../pageObjects/page"

describe('Login with email cases', () => {
    it('Open login page from landing page', async () => {
        await LandingPage.openLanding();
        
    });

    it('Open login with email page & successfully login', async () => {
        await LandingPage.openLanding();
    });

    it("Open login with email page & attempt to login with invalid password", async() => {

    });

    it("Open login with email page & attempt to login with non registered email", async() => {

    });

    it("Open login with email page & test form validation", async() => {

        //invalid email, required
        //required, not less than 6 chars

    });
});


