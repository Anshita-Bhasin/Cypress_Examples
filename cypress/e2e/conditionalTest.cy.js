describe(" Assertion Use Case 1- If Else Condition", () => {
  before("Open website and enter username, password", () => {
    cy.visit(
      "https://ecommerce-playground.lambdatest.io/index.php?route=account/login"
    );
  });
  it("Login into the application using credentials", () => {
    cy.get('[id="input-email"]').type("lambdatest.Cypress@disposable.com");
    cy.get('[id="input-password"]').type("Cypress123!!");
    cy.get('[type="submit"]').eq(0).click();
    cy.get('[name="search"]').eq(0).type("Macbook");
    cy.get('[type="submit"]').eq(0).click();
    cy.contains("Macbook");
    cy.get(".price-new").then(($value) => {
      if ($value.length > 0) {
        cy.log(" if condition");
      } else {
        cy.log("else condition");
      }
    });
  });
});
