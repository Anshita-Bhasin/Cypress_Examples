describe("Cypress Traversal Commands", () => {
  before(() => {
    cy.visit(
      "https://naveenautomationlabs.com/opencart/index.php?route=common/home"
    );
  });

  it(".eq Command", () => {
    // cy.visit(Cypress.env("webURL"));
    cy.get("div.image").eq(1).click();
  });
});



cy.request(Cypress.env("stageURL"));