describe("Multi Origin in Cypress", () => {
  it("Multi Origin test using cy.origin() ", () => {
    cy.visit('https://www.magicbricks.com/')
    cy.get('a[title="Twitter"]').invoke('attr', 'target', '_self').click({ force: true })
    cy.origin('https://twitter.com', () => {
      cy.contains('comJoined September 2009').should('exist')
    })
  });
  it("Error Case: When cy.origin is not passed", () => {
    cy.visit('https://www.magicbricks.com/')
    cy.get('a[title="Twitter"]').invoke('attr', 'target', '_self').click({ force: true })
    cy.contains('comJoined September 2009').should('exist')
  });
})
