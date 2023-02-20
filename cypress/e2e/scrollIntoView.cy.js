describe("Scroll into view", () => {
  it("Infinite - scroll into view", () => {
    cy.visit("https://www.swiggy.com/");
    cy.get("#location").type("Gurgaon");
    cy.contains("Gurgaon, Haryana, India").click();
    //cy.wait(2500);
    //cy.contains("FIND FOOD").click();
    cy.scrollTo("bottom");


    cy.contains("DN Snacks").scrollIntoView({
      offset: { top: -50, left: 0 },
    });

    //   .scrollIntoView({
    //     easing: "linear",
    //     duration: 5000,
    //   });
 //   cy.contains("Cake Desire").should("be.visible");
  });
});
