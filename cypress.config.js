const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
   
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    experimentalWebKitSupport: true,
    
      "retries": {
       
        "runMode": 2,
       
        "openMode": 1
      }
    
    

  },
})
