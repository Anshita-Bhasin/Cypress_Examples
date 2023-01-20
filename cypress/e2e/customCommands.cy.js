describe("Custom Commands", () => {
  it("use login method from custom commands", () => {
    cy.login("lambdatest.Cypress@disposable.com", "Cypress123!!").screenshot();
    cy.get('[name="search"]').eq(0).type("Macbook").screenshot();

    //cy.screenshot("test3", { capture: "fullPage" });

    // cy.screenshot("screen3");

    //cy.get('input#email',{force:true})
  });
});
