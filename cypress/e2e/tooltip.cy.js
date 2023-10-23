describe('Verify Tool Tip text in Cypress', () => {
    it('Test Case 1 - Tool Tip Text', () => {

        cy.visit('https://practice.expandtesting.com/tooltips')
        cy.get('#btn1').trigger('mouseover')
        cy.get('.tooltip-inner').should('be.visible').and('have.text', 'Tooltip on top')

    })
    it('TC2 - Tool Tip Text', () => {
        cy.visit('https://open.spotify.com/')
        cy.get('[aria-label="Collapse Your Library"]').trigger('mouseover')
        cy.get('#hover-or-focus-tooltip').should('be.visible')
            .and('have.text', "Collapse Your Library")
    })

})