describe('Refresh Page in Cypress', () => {

    it('Refresh page', () => {
        cy.visit('https://www.amazon.ae/')
        cy.contains('Best Sellers').should('be.visible')
        cy.reload()
        cy.contains('Best Sellers').should('be.visible')
        cy.reload(true)
        cy.contains('Best Sellers').should('be.visible')
        cy.reload({ timeout: 5000 })
        cy.contains('Best Sellers').should('be.visible')
        cy.window().then((data => {
            data.location.reload()
        }))
        cy.contains('Best Sellers').should('be.visible')
    })

})