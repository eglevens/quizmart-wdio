import chai = require('chai')
import chaiHttp = require('chai-http')
chai.use(chaiHttp)

export const mailAppUrl = 'https://api.testmail.app/api/json'
export const apiKey = '13fceada-8caf-4cac-b980-afa7086a4c74'

export const namespace = '78nhi'
export const tag = Math.random().toString(16)
export const testMail = '@inbox.testmail.app'

export async function getVerificationLinkFromEmail(tag: string): Promise<string> {

    let attempts = 1

    const currentDate = new Date()
    const timestamp = currentDate.getTime()

    while (attempts < 10) {
        const response = await chai.request(mailAppUrl)
            .get('')
            .query({ 'apikey': apiKey, 'namespace': namespace, 'pretty': 'true', 'timestamp_from': timestamp })

        const emailConfSubjectRegex = /(Email confirmation)/

        const emailVerificationLinkRegex = /(?<=href=")(.*)(?=" target=")/

        const emails = response.body.emails

        for (const email of emails) {
            if (email.subject != null) {
                if (email.subject.match(emailConfSubjectRegex)) {
                    const verificationLink = email.html.match(emailVerificationLinkRegex)[0]
                    return verificationLink
                }
                else {
                    await browser.pause(1000)
                    attempts++
                }
            }
        }
    }
}

