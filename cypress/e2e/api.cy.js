describe("API Test using plugin cypress-plugin-api", () => {
  it("test api - GET ", () => {
   
    cy.api("GET", "https://reqres.in/api/users?page=2").should((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("POST API testing Using Cypress API Plugin", () => {
    cy.api("POST", "https://reqres.in/api/users", {
      name: "Anshita",
      job: "QA leader",
    }).should((response) => {
      expect(response.status).to.eq(201);
    });
  });
  it("DELETE API testing Using Cypress API Plugin", () => {
    cy.api("DELETE", "https://reqres.in/api/users/2").should((response) => {
      expect(response.status).to.eq(204);
    });
  });
});
