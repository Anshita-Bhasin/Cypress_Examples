describe("Cypress Exception Handling", () => {
  it("Fail on status code by opening url in browser", () => {
    cy.visit(
      "https://ecommerce-playground.lambdatest.io/index.php?route=account/login/1",
      { failOnStatusCode: false }
    );
  });

  it("Fail on status code by calling api", () => {
    cy.request({
      url: "https://ecommerce-playground.lambdatest.io/index.php?route=account/login/1",
      failOnStatusCode: false,
    });
  });

  it("Test Failure when trying to find incorrect locator- error Message", () => {
    cy.on("fail", (err, runnable) => {
      console.log(err.message);
      return false;
    });
    cy.visit(
      "https://ecommerce-playground.lambdatest.io/index.php?route=account/login"
    );
    cy.get('[id="input-email"]').type("lambdatest.Cypress@disposable.com");
    cy.get('[id="input-password"]').type("Cypress1234!!");
    cy.get('[value="Login"]').click();
    cy.get(".error-message").should("be.visible");
    cy.log("test");
    cy.get('[name="search"]').eq(0).type("Macbook");
  });

  it("Test Failure when trying to find incorrect locator - Password", () => {
    cy.on("fail", (err, runnable) => {
      console.log(err.message);
      return false;
    });
    cy.visit(
      "https://ecommerce-playground.lambdatest.io/index.php?route=account/login"
    );
    cy.get('[id="input-email"]').type("lambdatest.Cypress@disposable.com");
    cy.get('[id="input-password1"]').type("Cypress1234!!");
  });
})

