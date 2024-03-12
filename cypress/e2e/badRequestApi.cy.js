describe('Test API in Cypress', () => {

    it('Testing Bad Request', () => {

        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/unknown/23',
            failOnStatusCode: false

        }).then((response) => {
            expect(response.status).to.be.eq(404)
        })

    })

})