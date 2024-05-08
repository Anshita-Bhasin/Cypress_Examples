describe('Test for multiple urls', () => {
    it('Fetch url and pass it to the next step', () => {
        cy.visit('https://naveenautomationlabs.com/opencart/')
            .get('[title="MacBook"]').click()
            .url().then((urlvalue) => {
                cy.writeFile('cypress/fixtures/url.json', { url: urlvalue });
            });
    });

    })