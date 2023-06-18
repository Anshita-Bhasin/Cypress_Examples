describe('Find broken links on the page', () => {

    it('verify navigation across the pages', () => {
        cy.visit('https://ecommerce-playground.lambdatest.io/index.php?route=common/home')
        let brokenLinks = 0
        let activeLinks = 0
        cy.get('a').each(($link, index) => {
            const href = $link.attr('href')
            if (href) {
                cy.request({ url: href, failOnStatusCode: false }).then((response) => {
                    if (response.status >= 400) {

                        cy.log(`**** link  ${index + 1} is Broken Link *** ${href} `)
                        brokenLinks++
                    }
                    else {
                        cy.log(`*** link  ${index + 1} is Active Link ***`)
                        activeLinks++

                    }

                })


            }

        }).then(($links) => {
            const totalLinks = $links.length
            cy.log(`**** total links **** ${totalLinks}`)
            cy.log(`**** broken links **** ${brokenLinks}`)
            cy.log(`**** active links **** ${activeLinks}`)


        })
    })


});
