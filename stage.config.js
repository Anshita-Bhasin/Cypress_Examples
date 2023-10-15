const { defineConfig } = require('cypress')

module.exports = defineConfig({
    video: true,
    e2e: {
        baseUrl: "https://www.amazon.com"
    }, env: {
        username: "testing stage"
    }
})

