describe(' Test Flaky Test', () => {
    it(' Test flake features', () => {
        cy.visit('/flkyTest.html')
        cy.get('#dynamic-content').should('have.text', 'Hello, World!');
    })
})