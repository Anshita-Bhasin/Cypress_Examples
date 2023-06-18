//Ref : https://docs.cypress.io/api/commands/selectfile
describe("Upload File Request", () => {
  it("TC1 - No Input Field || upload File by changing action", () => {
    cy.visit("https://www.ilovepdf.com/pdf_to_word");
    cy.get("a#pickfiles").selectFile("test.pdf", { action: "drag-drop" });
  });
  it.skip("TC2- Error Case- No Input Field|| upload File without changing action", () => {
    cy.visit("https://www.ilovepdf.com/pdf_to_word");
    cy.get("a#pickfiles").selectFile("test.pdf");
  });
  it.skip("TC3- Upload File with input field", () => {
    cy.visit("https://demoqa.com/upload-download");
    cy.get("input#uploadFile").selectFile("test.pdf");
  });
});
