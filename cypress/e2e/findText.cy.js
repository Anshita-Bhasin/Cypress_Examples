let getText;
describe("find text of an element", () => {

    it("Alias First Test - Using Invoke Command ", function () {
        cy.visit("https://www.dropbox.com/")
        cy.get('div.dwg-box.dwg-mt--1_5').invoke('text').as('textFunction');

    });


    it("Print Value - ALias => Invoke - Command)", function () {
        cy.log("===== Print Value Using Invoke Command ==== ", this.textFunction)
    })


    it("Alias Second Test - Using Wrap Command", () => {
        cy.visit("https://www.dropbox.com/")
        cy.get('div.dwg-box.dwg-mt--1_5').then($value => {
            const textValue = $value.text()
            cy.wrap(textValue).as('wrapValue')
        })
    })


    it("Print Value - ALias => Wrap - Command)", function () {
        cy.log("===== Print Value Uisng Wrap Command ==== ", this.wrapValue)
    })


    it("Third Test - using variable ", () => {
        cy.visit("https://www.dropbox.com/")
        cy.get('div.dwg-box.dwg-mt--1_5').then(($value) => {
            getText = $value.text()
        })
    })


    it("Print Value - Uisng Variables ", function () {
        cy.log("Print Value - Using Variables ====== ", getText)
    })




})

