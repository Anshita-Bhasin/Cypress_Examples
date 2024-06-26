const { defineConfig } = require("cypress");
const xlsx = require("xlsx");

function readDataFromExcel(data) {
  const workbook = xlsx.readFile(data.filePath, { dateNF: "mm/dd/yyyy" });
  const worksheet = workbook.Sheets[data.sheetName];
  return xlsx.utils.sheet_to_json(worksheet, { raw: false });
}

module.exports = defineConfig({
  env: {
    webURL:
      "https://naveenautomationlabs.com/opencart/index.php?route=account/login",
    login_username: "TestAB",
  },

  //defaultCommandTimeout: 5000,
  //chromeWebSecurity: false,
  // "chromePreferences": {
  //   "profile.default_content_settings": {
  //     "images": 2
  //   },
  //   "profile.managed_default_content_settings": {
  //     "insecure_content": "allow"
  //   }
  // }
  e2e: {
    experimentalRunAllSpecs: false,
    experimentalStudio: true,
    setupNodeEvents(on, config) {
      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
        readDataFromExcel: (data) => {
          return readDataFromExcel(data);
        },
      });
      return config;

      /* Disable image load on running test in Chromium based browser */

      on("before:browser:launch", (browser = {}, launchOptions) => {
        console.log(launchOptions.args);
        if (browser.family === "chromium" && browser.name !== "electron") {
          //launchOptions.args.push('--blink-settings=imagesEnabled=false')
          return launchOptions;
        }
      });
    },
    experimentalWebKitSupport: true,
    slowTestThreshold: 20000,
    // specPattern: "cypress/e2e/*.cy.js",

    env: {
      username: "user",
      password: "pass",
    },

    // 

    // retries: {
    //   //runMode: 1,
    //   openMode: 1
    // },
    excludeSpecPattern: [],

    watchForFileChanges: false,
    viewportWidth: 1000,
    viewportHeight: 600,
    defaultCommandTimeout: 2000
  },

  component: {
    devServer: {
      framework: "vue",
      bundler: "webpack",
    },
  },
});
