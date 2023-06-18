describe("Different approaches to find the length of elements on web page", () => {
  let length, totalCount, count;

  beforeEach(() => {
    cy.visit("https://www.tradeling.com/ae-en/catalog/audio-studio");
  });
  it("When expected length is known", () => {
    cy.get("dl.chakra-stack.css-ioc31s")
      .find('>dd:contains("United Arab Emirates")')
      .should("have.length", 40);
  });
  it("When expected length is not known", () => {
    cy.get("dl.chakra-stack.css-ioc31s")
      .find('>dd:contains("United Arab Emirates")')
      .then(($value) => {
        length = $value.length;
      });
  });
  it("Printing length - Approach1 ", () => {
    cy.log("*** length obtained using approach1 is *** " + length);
  });

  it("Using Cypress Method", () => {
    cy.get("dl.chakra-stack.css-ioc31s")
      .find('>dd:contains("United Arab Emirates")')
      .then((value) => {
        totalCount = Cypress.$(value).length;
        expect(value).to.have.length(totalCount);
      });
  });

  it("Printing length - Approach2", () => {
    cy.log("*** length obtained using approach2 is *** " + totalCount);
  });

  it("Finding Length - Approach3 Cypress Method", () => {
    count = cy
      .get("dl.chakra-stack.css-ioc31s")
      .find('>dd:contains("United Arab Emirates")')
      .its("length")
      .should("to.be", 40);
  });

});
