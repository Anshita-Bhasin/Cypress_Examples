describe('Test Alert Box', () => {

    it('Test Alert Box', () => {
        cy.visit('https://demoqa.com/alerts');
        cy.get('button#alertButton').click();
    })
})