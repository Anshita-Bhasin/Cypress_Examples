describe("Disable Cypress Test", () => {
  beforeEach(() => {
    cy.visit("https://bstackdemo.com/");
  })
  it("Tc1 - Test1", function () {
    cy.get("div.shelf-item__buy-btn").first().click();
  });
  it.skip("Tc2 - Disable test using .skip()", function () {
    cy.get("div.shelf-item__buy-btn").eq(1).click();
  });
});
