describe(" Mouse over", () => {
  it.only("mouse Over ", () => {
    cy.visit("https://www.bigbasket.com/");
    cy
    cy.get(
      ".icon.svg-header.svg-arrow-down-hover.svg-arrow-down-hover-dim"
    ).realHover("mouse");
    cy.get("a:contains('Beverages')").realHover("mouse");
    // cy.get("a:contains('Fresh Vegetables')").trigger("mouseover");
    // cy.get("a:contains('Cucumber & Capsicum)").click();
  });

  it(" Mouse Over- TC2", () => {
    cy.visit("https://naveenautomationlabs.com/opencart/");
    cy.get("li.dropdown>a:contains('Desktops')").realHover("mouse");
    cy.get("a:contains('PC (0)')").click();
  });
});
