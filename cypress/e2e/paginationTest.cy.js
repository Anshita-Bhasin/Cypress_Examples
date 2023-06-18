describe("Pagination Test", () => {
  let numberOfPages;

  it("Pagination Example ", () => {
    cy.visit(
      "https://www.lambdatest.com/selenium-playground/table-pagination-demo"
    );
    cy.get("li#prev").as("next");

    cy.get("div.pagination-container>nav>ul")
      .find(">li")
      .then(($value) => {
        numberOfPages = $value.length;

        cy.log("page count" + numberOfPages);

        for (let i = 0; i <= numberOfPages; i++) {
          cy.get("table#table-id>tbody>tr>td")
            .eq(1)
            .then(($value) => {
              if ($value.text == "Stuart Johnston") {
                cy.log(" Name Found ");
                cy.log("page is " + i);
              } else {
                cy.log(" Name not Found ");
                cy.log(" Moving to the next page");
                cy.get("@next").click({ force: true });
              }
            });
        }
      });
  });
});
