describe("Should Exist Assertion - If Else Condition", () => {
  it("Open website and enter username, password", () => {
    cy.visit(
      "https://ecommerce-playground.lambdatest.io/index.php?route=account/login"
    );
  });
  it("Login into the application using credentials", () => {
    cy.get('[id="input-email"]').type("lambdatest.Cypress@disposable.com");
    cy.get('[id="input-password"]').type("Cypress123!!");
    cy.get('[type="submit"]').eq(0).click();
  });
  it("Search the Product", () => {
    cy.get('[name="search"]').eq(0).type("Macbook");
    cy.get('[type="submit"]').eq(0).click();
  });
  it("Verify Product after search and perform action based on the result", () => {
    cy.contains("Macbook");
    cy.get(".price-new").should("exist");
    if (cy.get(".price-new").should("exist")) {
      cy.log("present");
      cy.get(".caption").first().click();
    } else {
      cy.log("else condition ");
    }
  });
});
