describe("Hello Cypress Studio", () => {

  /* ==== Test Created with Cypress Studio ==== */
  it('recorder_test', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('https://bstackdemo.com/');
    cy.get('#\\31  > .shelf-item__buy-btn').click();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.buy-btn').click();
    cy.get('#username > .css-yk16xz-control > .css-1hwfws3 > .css-1wa3eu0-placeholder').click();
    cy.get('#react-select-2-option-0-0').click();
    cy.get('.css-1wa3eu0-placeholder').click();
    cy.get('#react-select-3-option-0-0').click();
    /* ==== End Cypress Studio ==== */
  });
});
