import { text } from './Login.cy'
describe(' Access value from other cypress test', () => {

    it('Access type text from different Cypress test', () => {
        cy.visit(
            "https://ecommerce-playground.lambdatest.io/index.php?route=account/login"
        );
        cy.get('[id="input-email"]').type(text)

    })

})