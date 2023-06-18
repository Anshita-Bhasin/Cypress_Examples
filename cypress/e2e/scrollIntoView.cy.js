describe("Scroll into view", () => {
  it("Infinite - scroll into view", () => {
    cy.visit("https://www.swiggy.com/");
    cy.get("#location").type("Gurgaon");
    cy.contains("Gurgaon, Haryana, India").click();
    cy.scrollTo("bottom");
    cy.contains("Pune").should("be.visible");
  });
});
