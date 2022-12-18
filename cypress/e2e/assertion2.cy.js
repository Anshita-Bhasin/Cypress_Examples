describe("Assertion Use Case2 - If Else Condition", () => {
  it("Condition 1- Click If the element exist on the page", () => {
    cy.visit(
      "https://naveenautomationlabs.com/opencart/index.php?route=account/login"
    );

    cy.get('[id="input-email"]').type("cypress.test1@disposable.com");
    cy.get('[id="input-password"]').type("Cypress123!!");

    cy.get(".btn.btn-primary").then(($value) => {
      if ($value.length > 0) {
        cy.log(" Button Exist ");
        $value.click();
      } else {
        cy.log(" Button does not exist");
      }
    });
  });

  it("Condition 2- If there are more than 1 elements on the page", () => {
    cy.get(".dropdown-toggle").then(($value) => {
      if ($value.length > 0) {
        cy.log(" Inside If condition ");
        $value.first().click();
      } else {
        cy.log(" Inside else condition ");
      }
    });
  });
});
