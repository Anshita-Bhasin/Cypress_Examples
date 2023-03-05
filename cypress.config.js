const { defineConfig } = require("cypress");
import { unlinkSync } from 'fs'

module.exports = defineConfig({
  env: {
    webURL: "https://medium.com",
    login_username: "TestAB",
  },

  e2e: {
    experimentalStudio: true,

    setupNodeEvents(on, config) {
      // return on("task", {
      //   log(message) {
      //     console.log(message);
      //     return null;
      //   },
      // });

      on('after:spec', (spec, results) => {
        if (config.video) {
          if (results.stats.failures || results.stats.skipped) {
            console.log(" Preserve video => Failed/ Skipped Spec")
          }
          else {
            unlinkSync(results.video)
            console.log('Deleting videos for passed spec files')
          }
        }
      })

    },
    experimentalWebKitSupport: true,

    slowTestThreshold: 20000,

    specPattern: "cypress/e2e/**/*.cy.js",

    retries: {
      runMode: 2,
      openMode: 1,
    },
    excludeSpecPattern: [

    ],

    watchForFileChanges: false,
    viewportWidth: 1000,
    viewportHeight: 600,
  },

  defaultCommandTimeout: 5000,
  chromeWebSecurity: false,
});
