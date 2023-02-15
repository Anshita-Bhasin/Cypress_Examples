describe("Cypress useful commands", () => {
  it("DropDown Example", () => {
    cy.visit(
      "https://chercher.tech/practice/practice-dropdowns-selenium-webdriver"
    );
    // cy.get("select#first").select("Yahoo");
    cy.get("select#animals").select("Avatar");
    cy.get("select#second").select(["Donut", "Bonda"]);
    // cy.get("select#first").select("Google", { force: true });

    cy.log("print ", cy.get("select#first").children("option").eq(2));

    cy.log(
      "children ",
      cy.get("select#first").children("option").should("contain", "Yahoo")
    );
  });
});
