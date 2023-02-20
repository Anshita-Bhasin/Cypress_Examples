describe("Mouse Hover", () => {
  it("TC1 - House hover", () => {
    cy.visit(
      "https://www.tradeling.com/ae-en"
      // , {
      //   headers: { "Accept-Encoding": "gzip, deflate" },
      // }
    );
    cy.get("[data-testid='all_categories_nav_bar']").trigger("mouseover");
    //});
  });
});
