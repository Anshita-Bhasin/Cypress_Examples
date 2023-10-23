describe('Multi-Country Application Test', () => {
    const country_code = ['/ae/', '/uk/', '/in/', '/ca/']

    it('Should test application behavior for country', () => {
        country_code.forEach((country) => {
            cy.visit(`https://www.apple.com${country}`)
            cy.url().should('include', country)
            cy.verifyCountry(country).then((text) => {
                cy.get('[title="Choose your country or region"]')
                    .should('have.text', text)
            })
        })

    });

});

