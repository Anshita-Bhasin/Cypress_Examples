import test from '../e2e/accessFunction.cy'
describe(' Access function from cypress commands', () => {


    it('Access function- Different test', () => {
        cy.visit(
            "https://ecommerce-playground.lambdatest.io/index.php?route=account/login"
        );

        test().then((value) => {
            cy.get('[id="input-password"]').type(value)
        })

    })

})