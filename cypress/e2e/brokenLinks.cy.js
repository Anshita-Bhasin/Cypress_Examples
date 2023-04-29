describe(' Find broken links in Cypress ', () => {

    it('check broken links', () => {

        cy.visit('https://www.tic.com/')

        let code


        cy.get('a').each((link) => {
            let code = cy.request({ url: link.prop('href'), failOnStatusCode: false })

            if (code.its('status') == 200) {
                cy.log("=== broken link ===")
            }
            else {
                cy.log("=== 200 link ===")
            }
        })
    })


})