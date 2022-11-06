describe("Pagination Test", () => {


    it("test pagination", () => {

        cy.contains("Next").as('next')
        const goToNextpage = () => {

            cy.get('next').invoke('attr', 'disabled').then(visible => {

                if (visible == 'disabled') {

                    cy.get('@next').should('have.attr', 'disabled')
                }
                else {
                    cy.get('@next').click().then(goToNextpage)
                }
            })

        }
        goToNextpage()
    })
})