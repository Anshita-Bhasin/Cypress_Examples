describe("XHR Request", () => {
  it("XHR Req", () => {
    cy.visit(
      "https://naveenautomationlabs.com/opencart/index.php?route=account/register"
    );
    cy.get("[placeholder='Search']").type("macbook").focus();
  });
});
