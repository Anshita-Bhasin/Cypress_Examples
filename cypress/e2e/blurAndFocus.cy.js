describe("Blur an element", () => {
    it(".blur() - blur off a DOM element", () => {
        cy.visit(
            "https://naveenautomationlabs.com/opencart/index.php?route=account/register"
        );

        cy.get("#input-firstname").type("Test AB").blur();
        cy.get("#input-lastname").type("Test").focus();
    });
})
