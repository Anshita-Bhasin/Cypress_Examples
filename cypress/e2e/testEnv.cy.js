describe('Testing with Various Configuration Files', () => {
    it('Visits the Application Based on Config File', () => {
        cy.visit(Cypress.env('stage_url'))
        // cy.log(" Printing the username "
        //     + Cypress.env('username'))

    });
});
