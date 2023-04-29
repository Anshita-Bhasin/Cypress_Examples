describe("Custom Commands", () => {
  it("use login method from custom commands", () => {
    cy.visit("https://bstackdemo.com/").screenshot();
    cy.get('[name="search"]').eq(0).type("Macbook").screenshot();

    //cy.screenshot("test3", { capture: "fullPage" });

    // cy.screenshot("screen3");

  });

  it('should take a screenshot with timestamp', () => {
    cy.visit("https://bstackdemo.com/");
    cy.screenshotWithTimestamp('my-screenshot');
  });

});
