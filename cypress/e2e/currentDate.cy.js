describe('Check current date', () => {

    it("Today's Date", () => {


        cy.log("date", Date.now())
        const date = new Date();

        cy.log("format date", date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + '-' + date.getHours() + ':' + date.getMinutes())
    })
})