describe("Assertion Use Case2 - If Else Condition", () => {
  beforeEach(() => {
    cy.visit(
      "https://naveenautomationlabs.com/opencart/index.php?route=account/login"
    );
  });
  it("Condition 1- Click If the element exist on the page using length >0", () => {
    cy.get('[id="input-email"]').type("cypress.test1@disposable.com");
    cy.get('[id="input-password"]').type("Cypress123!!");

    cy.get(
      "[action='https://naveenautomationlabs.com/opencart/index.php?route=account/login']"
    ).then(($value) => {
      if ($value.find(".btn.btn-primary").length > 0) {
        cy.log(" Button Exist ");
        $value.click();
      } else {
        cy.log(" Button does not exist");
      }
    });
  });

  it("Condition 2- Click If the element does not exist on the page => passing incorrect element inside find()", () => {
    cy.get('[id="input-email"]').type("cypress.test1@disposable.com");
    cy.get('[id="input-password"]').type("Cypress123!!");

    cy.get(
      "[action='https://naveenautomationlabs.com/opencart/index.php?route=account/login']"
    ).then(($value) => {
      if ($value.find(".btn.btn-primary1").length > 0) {
        cy.log(" Button Exist ");
        $value.click();
      } else {
        cy.log(" Button does not exist");
      }
    });
  });

  it("Condition 3 - If there are more than 1 elements on the page ", () => {
    cy.get(".dropdown-toggle").then(($value) => {
      if ($value.length > 0) {
        cy.log(" Inside If condition ");
        $value.first().click();
      } else {
        cy.log(" Inside else condition ");
      }
    });
  });

  it("Condition 4 -> Used length==0 where it checks if no element exist otherwise it will go to else condition", () => {
    cy.get(".dropdown-toggle").then(($value) => {
      if ($value.length == 0) {
        cy.log(" Inside If condition ");
        cy.log(" Element does not exist ");
      } else {
        cy.log(" Inside else condition ");
        cy.log(" ELement exist");

        $value.first().click();
      }
    });
  });

  it("Condition 5- Using .length() directly where it returns 0 ", () => {
    if (cy.get(".dropdown-toggle").length) {
      cy.log(" Inside If condition ");
      cy.log(" Element does not exist ");
    } else {
      cy.log(" Inside else condition ");
      cy.log(" ELement exist");
    }
  });
});
