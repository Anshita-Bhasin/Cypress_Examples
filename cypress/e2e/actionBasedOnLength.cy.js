describe("Performing action if element is not present-  using Cypress", () => {
  it("Open website and enter username, password", () => {
    cy.visit(
      "https://ecommerce-playground.lambdatest.io/index.php?route=account/login"
    );

    cy.get(".form-group").then(($ele) => {
      if ($ele.find("#input-password1").length) {
        cy.log("-- input-passowrd1 element not present --- ");
        cy.get('[id="input-email"]').type("lambdatest.Cypress@disposable.com");
      } else {
        cy.log("--  element is present --- ");
        cy.get('[id="input-password"]').type("Cypress123!!");
        cy.get('[type="submit"]').eq(0).click();
      }
    });
  });

  it("Open website and enter username, password", () => {
    cy.visit(
      "https://www.lambdatest.com/selenium-playground/bootstrap-modal-demo"
    );
    cy.get('[data-target="#myModal"]').click();

    cy.get("body").then(($popup) => {
      if ($popup.find(".ltkpopup-standard").length) {
        cy.log("--- element not present --- ");
      } else {
        cy.log("--  element is present --- ");
      }
    });
  });
});


