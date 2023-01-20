const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    webURL: "https://medium.com",
    login_username: "TestAB",
  },

  e2e: {
    setupNodeEvents(on, config) {
      return on("task", {
        log(message) {
          console.log(message);
          return null;
        },
      });
      require("./cypress/plugins/index.js")(on, config);
    },
    experimentalWebKitSupport: true,
    //defaultCommandTimeout:6000,
    slowTestThreshold: 20000,

    specPattern: "cypress/e2e/**/*.cy.js",

    retries: {
      runMode: 2,
      openMode: 1,
    },

    watchForFileChanges: false,
    viewportWidth: 1000,
    viewportHeight: 600,
  },

  defaultCommandTimeout:5000
});
