describe(" Delay the text entering in Cypress", () => {
  it("Enter username and password with delay of 0 milliseconds", () => {
    cy.visit("https://wordcounter.net/");
    cy.get("textarea#box").type(
      "Cypress is a next generation front end testing tool built for the modern web. We address the key pain points developers and QA engineers face when testing modern applications.",
      { delay: 0 }
    );
  });

  it("Enter username and password with no delay of 0 milliseconds", () => {
    cy.get("textarea#box").type(
      "Cypress is a next generation front end testing tool built for the modern web. We address the key pain points developers and QA engineers face when testing modern applications.'"
    );
  });
});


cy.log(Cypress.browser.version);
