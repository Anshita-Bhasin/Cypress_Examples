
describe('Typing value and then clicking enter', () => {

    it('Test type and enter', () => {

        cy.visit("https://accounts.google.com/")
        cy.get('input#identifierId').type('anshita{enter}');

    })
    it("Type enter in first and second element", () => {

        cy.visit("https://accounts.google.com/")
        cy.get('input#identifierId').eq(0).click().type('anshita{enter}');
       

    })


})