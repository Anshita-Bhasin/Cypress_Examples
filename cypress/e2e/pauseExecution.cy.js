describe("Pause And Hide logs in Cypress", () => {
  it("Open website and enter username,pause the execution and pass password", () => {
    cy.visit(
      "https://ecommerce-playground.lambdatest.io/index.php?route=account/login"
    );

    cy.get('[id="input-email"]').type("lambdatest.Cypress@disposable.com");
    cy.pause();
   cy.get('[id="input-password"]').type("Cypress123!!");
    cy.get('[type="submit"]').eq(0).click();
  });

  it("Open website and enter username,hide the log - entered username", () => {
    cy.visit(
      "https://ecommerce-playground.lambdatest.io/index.php?route=account/login"
    );
    cy.get('[id="input-email"]').type("lambdatest.Cypress@disposable.com",{log:false});
    cy.get('[id="input-password"]').type("Cypress123!!");
  });
});



