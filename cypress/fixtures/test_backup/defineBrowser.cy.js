describe('Change browser in the test case', () => {
    beforeEach(() => {

        cy.visit("https://www.docker.com/")
    })

    it("Browser is chrome", { browser: "chrome" }, () => {
        cy.log("Chrome");
    })


    it("Browser is webkit", { browser: "Electron" }, () => {
        cy.log("Webkit");
    })

    it("Browser is Electron", { browser: "Webkit" }, () => {
        cy.log("Electron");
    })
})