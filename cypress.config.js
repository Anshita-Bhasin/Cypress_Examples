const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    webURL: "https://medium.com",
    login_username: "TestAB",
  },

  e2e: {
    experimentalStudio: true,

    setupNodeEvents(on, config) {
      return on("task", {
        log(message) {
          console.log(message);
          return null;
        },
      });
    },
    experimentalWebKitSupport: true,
    //defaultCommandTimeout:6000,
    slowTestThreshold: 20000,

    specPattern: "cypress/e2e/**/*.cy.js",

    retries: {
      runMode: 2,
      openMode: 1,
    },
    excludeSpecPattern: [
      "cypress/e2e/**/assertion2.cy.js",
      "cypress/e2e/**/newTab.cy.js",
      "cypress/e2e/**/windowHandling.cy.js",
    ],

    watchForFileChanges: false,
    viewportWidth: 1000,
    viewportHeight: 600,
  },

  defaultCommandTimeout: 5000,
  chromeWebSecurity: false,
});
