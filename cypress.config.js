const { defineConfig } = require("cypress");
//import { unlinkSync } from 'fs'

module.exports = defineConfig({
  env: {
    webURL: "https://naveenautomationlabs.com/opencart/index.php?route=account/login",
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

      /* on('after:spec', (spec, results) => {
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

      if (browser.family === 'firefox') {
        const existingMimeTypes =
          options.preferences['browser.helperApps.neverAsk.saveToDisk']
        const myMimeType = 'my/mimetype'

        // prevents the browser download prompt
        options.preferences[
          'browser.helperApps.neverAsk.saveToDisk'
        ] = `${existingMimeTypes},${myMimeType}`

        return options
      }
    })
*/

      /* Disable image load on runing test in Chromium based browser */

      on('before:browser:launch', (browser = {}, launchOptions) => {
        console.log(launchOptions.args)
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          //launchOptions.args.push('--blink-settings=imagesEnabled=false')

          return launchOptions
        }


      })


    },
    experimentalWebKitSupport: true,

    slowTestThreshold: 20000,

    specPattern: "cypress/e2e/*.cy.js",

    //retries: {
    //runMode: 1,
    //openMode: 1,
    //},
    excludeSpecPattern: [

    ],

    watchForFileChanges: false,
    viewportWidth: 1000,
    viewportHeight: 600,
  },

  defaultCommandTimeout: 5000,
  //chromeWebSecurity: false,

  // "chromePreferences": {
  //   "profile.default_content_settings": {
  //     "images": 2
  //   },
  //   "profile.managed_default_content_settings": {
  //     "insecure_content": "allow"
  //   }
  // }



});
