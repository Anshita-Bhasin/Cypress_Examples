describe('Disable Image', () => {
    it('disable image load in Cypress', () => {
        // Based on the below config, you can disable image on page loafd in cypress
        /* Pass this in Cypress.config.js


        on('before:browser:launch', (browser = {}, launchOptions) => {
        console.log(launchOptions.args)
        if (browser.family === 'chromium' && browser.name !== 'electron') {
        //launchOptions.args.push('--blink-settings=imagesEnabled=false')
        return launchOptions
        }

*/
        cy.visit('https://www.amazon.com')
    })
})

