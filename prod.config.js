const { defineConfig } = require('cypress')

module.exports = defineConfig({
    video: true,
    e2e: {
        baseUrl: "https://www.google.com"
    },
    env: {
        username: "testing prod"
    }
})

