describe('Fetch URL from Test1', () => {
    it('pass URL from fixture file', () => {
       cy.fixture('url').then((urlValue) => {
            cy.visit(urlValue)
        })

    });
});
