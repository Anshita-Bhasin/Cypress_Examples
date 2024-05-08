describe('PF Input Fields', () => {
    it("SERP Page", () => {

        cy.visit('https://www.propertyfinder.ae/en/buy/properties-for-sale.html')
        cy.get('[data-testid="multi-selection-autocomplete-template-input"]').type('Marina')
    })
    it("New project Page", () => {

        cy.visit('https://www.propertyfinder.ae/en/new-projects')
        cy.get('[data-testid="search-field-input"]').type('Marina')
    })
})