describe('Find case sensitive search on the page', () => {
    it('verify exact match case in Cypress', () => {
        cy.visit('https://ecommerce-playground.lambdatest.io/index.php?route=common/home')
        cy.contains('ADDONS', { matchCase: false }).click()
    })
});
