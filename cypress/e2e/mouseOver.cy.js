describe("mouse Hover", () => {
  it("mouse hover", () => {
    cy.visit("https://www.costco.com/#", {
      headers: { "Accept-Encoding": "gzip, deflate" },
    });
    cy.get("#navigation-dropdown").trigger("mouseover", { force: true });
    cy.get("#level1-all-departments")
      .find(">ul>li:contains('Baby')")
      .trigger("mouseover");
    cy.get("#level2-all-departments")
      .find(">ul>li:contains('Baby Care & Safety')")
      .trigger("mouseover", { force: true });

    cy.get("#level3").find(">ul>li:contains('Baby Monitors')").click();
  });
});
