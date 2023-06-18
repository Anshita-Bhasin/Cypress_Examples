
describe(" Read csv file using cy.readFile", () => {

    it('Read csv', () => {
        cy.readFile('cypress/fixtures/test.csv').then((data) => {
            cy.log("data === " + data)
        })
    })



})
