describe(' Tool Tip use case', () => {
    it(' Verify Tool Tip - Text', () => {
        cy.visit('https://open.spotify.com/')
        cy.get('[aria-label="Close"]').eq(2).click()
        cy.get('[data-encore-id="buttonTertiary"]')
            .first()
            .invoke('show').trigger('mouseover')
        cy.get('#hover-or-focus-tooltip').should('have.text', 'Collapse Your Library')


    })

})