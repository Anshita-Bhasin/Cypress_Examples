let text
describe('Access common functionality using Cypress commands', () => {
    it('Access function and store text value', () => {
        cy.visit(
            "https://ecommerce-playground.lambdatest.io/index.php?route=account/login"
        );
        cy.sum(10, 12).then((value) => {
            cy.get('[id="input-email"]').type(value);
        });
        cy.get('[id="input-email"]').invoke('val').then((value) => {
            text = value;
            cy.log("**** printed text **** ", text)
            return cy.wrap(text)
        })

    })

})



export { text };
