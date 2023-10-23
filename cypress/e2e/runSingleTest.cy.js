describe('Run specific tests', () => {
    it.only('Run 1st case only', () => {
        cy.log(" ==== Run Test 1 =====")

    })


    xit('Run 2nd case', () => {
        cy.log(" ==== Run Test 2 =====")


    }),
        it.skip('Run 3rd test case', () => {
            cy.log(" ==== Run Test 3 =====")


        })
})