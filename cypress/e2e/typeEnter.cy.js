
describe('Typing value and then clicking enter', () => {

    it('Test type and enter', () => {

        cy.visit("https://accounts.google.com/")
        cy.get('input#identifierId').type('anshita{enter}');

    })


})