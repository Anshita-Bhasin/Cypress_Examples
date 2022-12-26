describe(" Different ways to open google.com", () => {

    it('Read csv', () => {
        cy.readFile('../fixtures/test.csv').then((data)=>{
            cy.log("data === " +data)
        })
    })
    


})
