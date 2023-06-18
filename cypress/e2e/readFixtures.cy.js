describe('read fixtures', () => {
    let a

    it('read fixtures - json', () => {
        cy.fixture("testData").then((data) => {
            a = data.data.attributes[0].slug
            cy.log("=== print a ====" + JSON.stringify(a))

        })

    })


})