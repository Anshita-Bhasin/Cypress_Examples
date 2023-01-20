describe(" Delay the text entering in Cypress", () => {
  it("Enter username and password with delay of 0 milliseconds", () => {
    cy.visit("https://www.linkedin.com/");
    const window_url =
      "https://accounts.google.com/o/oauth2/auth/identifier?redirect_uri=storagerelay%3A%2F%2Fhttps%2Fwww.linkedin.com%3Fid%3Dauth321867&response_type=permission%20id_token&scope=email%20profile%20openid&openid.realm&client_id=990339570472-k6nqn1tpmitg8pui82bfaun3jrpmiuhs.apps.googleusercontent.com&ss_domain=https%3A%2F%2Fwww.linkedin.com&fetch_basic_profile=true&gsiwebsdk=2&service=lso&o2v=1&flowName=GeneralOAuthFlow";

    cy.window().then((win) => {
      const stub = cy.stub(win, "open").as("windowopen");
    });

    cy.get("button.google-sign-in-cta__button").click();
    cy.window().then((win) => {
      win.location.href = window_url;
      cy.get('input[type = "email"]').as("input");
    });
  });
});
