describe('Pass Enter Key : Open google and search for text without clicking google search button', () => {


    it('Pass Enter Key ', () => {

        cy.visit("https://www.google.com")
        cy.get('#APjFqb').type("time{enter}")
        cy.contains("time.is").click()
        cy.origin("https://www.time.is", () => {
            cy.log(" == test===")
        })

    })


})