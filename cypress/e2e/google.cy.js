describe(" Different ways to open google.com", () => {

    it('open google without http', () => {
        cy.visit("www.google.com/")
    })
    it('open google with http', () => {
        cy.visit("http://www.google.com")
    })

    it('open google with https', () => {
        cy.visit("https://www.google.com")
    })

    it('open google with only google.com', () => {
        cy.visit("www.google.com")
    })

    it('open google with no www', () => {
        cy.visit("http://google.com")
    })
    it('error Case - open google with no www', () => {

        cy.visit("google.com")
    })


})
