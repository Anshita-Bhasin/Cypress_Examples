describe("Login to a Website with Basic Authentication", () => {
    it("1st Approach - should log in using basic authentication", () => {
        cy.visit('https://authenticationtest.com/HTTPAuth/', {
            auth: {
                username: Cypress.env('username'),
                password: Cypress.env('password')
            }
        })
        cy.contains('Login Success').should('be.visible')

    });
    it("2nd Approach - should log in using basic authentication", () => {

        cy.visit('https://user:pass@authenticationtest.com/HTTPAuth/')
        cy.contains('Login Success').should('be.visible')

    });

    it('3rd Approach - should login using basic authentication', () => {
        cy.loginBasicAuth()
        cy.contains('Login Success').should('be.visible')

    })
});
