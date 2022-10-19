let getText;
describe("find text of an element", () => {

    it("find text", function () {

        cy.visit("https://www.dropbox.com/")
        cy.get('div.dwg-box.dwg-mt--1_5').invoke('text').as('bhasin');

    });


    it("second test", function () {
        cy.log("second test", this.bhasin)
    })


    it("third test ", () => {
        cy.visit("https://www.dropbox.com/")
        cy.get('div.dwg-box.dwg-mt--1_5').then(($value) => {
            getText = $value.text()
            cy.log("print Text", getText)
        })
    })
})

