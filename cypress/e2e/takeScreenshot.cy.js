describe("Custom Commands", () => {
  it("use login method from custom commands", () => {
    cy.visit("https://bstackdemo.com/").screenshot();
    cy.get('.shelf-item__buy-btn').eq(0).click();
    cy.screenshot("test3", { capture: "fullPage" });

  });

  it('should take a screenshot with timestamp', () => {
    cy.visit("https://bstackdemo.com/");
    cy.screenshotWithTimestamp('my-screenshot');
  });

});
