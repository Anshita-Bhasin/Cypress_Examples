describe("Should Exist Assertion - If Else Condition", () => {
  it("Open website and enter username, password", () => {
    cy.visit(
      "https://naveenautomationlabs.com/opencart/index.php?route=account/login"
    );

    cy.get('[id="input-email"]').type("cypress.test1@disposable.com");
    cy.get('[id="input-password"]').type("Cypress123!!");

    cy.get(".btn.btn-primary").then(($value) => {
      if ($value.length < 0) {
        cy.log(" Button Exist ");
        $value.click();
      } else {
        cy.log(" Button does not exist");
      }
    });
  });
});
