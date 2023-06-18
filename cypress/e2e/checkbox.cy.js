describe("Handle checkbox in Cypress", () => {
    beforeEach(() => {
        cy.visit(
            "https://naveenautomationlabs.com/opencart/index.php?route=account/register"
        );
    })
    it(" Checbox Handling: check and uncheck ", () => {
        cy.get("label input[type='radio']").check("1", { force: true });
        cy.get("[type='checkbox']").check();
        cy.get("[type='checkbox']").uncheck();
    });

})
