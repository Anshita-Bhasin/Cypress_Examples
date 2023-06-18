describe("Automation using Cypress", () => {
  it("Open website and enter username, password", () => {
    cy.visit(
      "https://ecommerce-playground.lambdatest.io/index.php?route=account/login"
    );
    cy.get('[id="input-email"]').type("lambdatest.Cypress@disposable.com");
    cy.get('[id="input-password"]').type("Cypress123!!");
    cy.get('[type="submit"]').eq(0).click();

    cy.get('[name="search"]').eq(0).type("Macbook");
    cy.get('[type="submit"]').eq(0).click();

    cy.contains("Macbook");
  });


});
