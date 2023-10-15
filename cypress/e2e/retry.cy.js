describe("Login into web application  using Cypress", () => {
  it("Open website and enter username, password", () => {
    cy.visit(
      "https://ecommerce-playground.lambdatest.io/index.php?route=account/login"
    );
  
    cy.get('[id="input-email11"]',{timeout:0}).type("lambdatest.Cypress@disposable.com");

  });
});


