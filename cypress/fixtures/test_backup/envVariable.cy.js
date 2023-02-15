describe("Test case using env variable", () => {
  it.only("Pass url and username from env variable", () => {
    cy.visit(Cypress.env("testURL"));
    cy.get('[id="input-email"]').type("lambdatest.Cypress@disposable.com");
    cy.get('[id="input-password"]').type(Cypress.env("login_username"));
  });
});
