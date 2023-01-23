describe("Window hanlding in Cypress", () => {
  it("Handling new Browser Window", function () {
    //cy.visit("https://testing.com/login");
    cy.get("span:contains('Login')").click();

    cy.window().then((win) => {
      cy.switchTo(win);
      // cy.stub(win, "open").as("windowOpen");
    });

    // cy.window().then((win) => {
    //   cy.stub(win, "open", (url) => {
    //     win.location.href = "https://login.microsoftonline.com/";
    //   }).as("popup");
    // });

    //cy.get("@windowOpen").should("be.called");
    cy.get("[data-test-id='signinOptions']").click();
  });
});
