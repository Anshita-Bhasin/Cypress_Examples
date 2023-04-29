describe('open google', () => {


    it('google', () => {

        cy.visit("https://www.google.com")
        cy.get('#APjFqb').type("time{enter}")
        cy.contains("time.is").click()
        cy.origin("https://www.time.is", () => {
            cy.log(" == test===")
        })

    })
})