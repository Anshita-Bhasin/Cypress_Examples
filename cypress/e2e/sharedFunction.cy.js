function test() {
    const value = 11 + 15
    cy.wrap(value).as('testing')
    return cy.get('@testing').then((value) => {
        return value;
    })
} 

describe(' Access common from cypress commands', () => {

    
    it('Access function', () => {
        cy.visit(
            "https://ecommerce-playground.lambdatest.io/index.php?route=account/login"
        );
        cy.sum(10, 12).then((value) => {
            cy.get('[id="input-email"]').type(value);
        });
         test().then((value) => {
             cy.get('[id="input-password"]').type(value)
         })

    })

})


    export default test;