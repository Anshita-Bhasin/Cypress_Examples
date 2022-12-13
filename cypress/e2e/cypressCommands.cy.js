describe("Cypress useful commands", () => {
  it.skip("cypress commands", () => {
    cy.visit(
      "https://naveenautomationlabs.com/opencart/index.php?route=common/home"
    );
    cy.get("[alt='iPhone']").as("iphone");
    cy.get("@iphone").click();

    cy.get("[placeholder='Search']").type("{shift}macbook");
    cy.get("[placeholder='Search']").clear();
    cy.get("#button-cart").click();
  });
  it.only("opne cart registration form", () => {
    cy.visit(
      "https://naveenautomationlabs.com/opencart/index.php?route=account/register"
    );
    cy.get("#input-firstname").type("Test AB");
    cy.get("#input-firstname").type("Test");

    cy.get("#input-lastname").type("AB", { delay: 1000 });

    cy.get("#input-email").type("Test.AB@disposable.com");

    cy.get("#input-telephone").type("234567890");
    cy.get("#input-password").type("testA12!!");
    cy.get("#input-confirm").type("testA12!!");
    cy.get("input[type='submit']").click();
    cy.get("label input[type='radio']").check("1", { force: true });
    cy.get("[type='checkbox']").check();
  });

  it.skip("DropDown Example", () => {
    cy.visit(
      "https://chercher.tech/practice/practice-dropdowns-selenium-webdriver"
    );
    cy.get("select#first").select("Yahoo");
    cy.get("select#animals").select("Avatar");
    cy.get("select#second").select(["Donut", "Bonda"]);
    cy.get("select#first").select("Google", { force: true });
  });
});

it("API Test", () => {
  cy.request("GET", "https://api.coinbase.com/v2/currencies").then(
    (response) => {
      console.log("response is == ", response);
      console.log(response.status);
      //assert(response.status, "200");
    }
  );
});

it("Cypress Command - Task", () => {
  cy.task("log", "hello World");
});

it("Cypress Command - ScrollTo", () => {
  cy.visit(
    "https://naveenautomationlabs.com/opencart/index.php?route=account/register"
  );
  cy.scrollTo(0, 500);
  cy.scrollTo("topRight");
  cy.scrollTo("bottom");
  // cy.get("#input-lastname").scrollTo("center");
});
it.only(".focus() - focus on a DOM element", () => {
  cy.visit(
    "https://naveenautomationlabs.com/opencart/index.php?route=account/register"
  );
  cy.get("[placeholder='Search']").type("macbook").focus();
});

it.only(".blur() - blur off a DOM element", () => {
  cy.visit(
    "https://naveenautomationlabs.com/opencart/index.php?route=account/register"
  );
  cy.get("[placeholder='Search']").type("macbook").blur();
});
