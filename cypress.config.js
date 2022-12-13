const { defineConfig } = require("cypress");

module.exports = defineConfig({
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

    retries: {
      runMode: 2,
      openMode: 1,
    },
    watchForFileChanges: false,
    viewportWidth: 1000,
    viewportHeight: 600,
  },
});
