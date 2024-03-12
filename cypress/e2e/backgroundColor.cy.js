describe('Verify the background color', () => {


    it('Check background color', () => {

        cy.visit('https://www.amazon.ae/')
        cy.get('#nav-xshop').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')

    })
})