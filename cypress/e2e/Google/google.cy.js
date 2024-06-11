describe(' Google Login', () => {

    it(' google sign', () => {
        cy.visit('https://www.google.com')
        cy.contains('English').click()
        cy.get('a[aria-label="Sign in"]').click()
        cy.wait(45000)
        cy.on('window:alert', (t) => {
            cy.get('input[type="email"]').type('testing0@yopmail.com')
            cy.contains('Next').eq(3).click()
            expect(t).to.contains('Your full name');
        })

        cy.get('input').type('abab')
        cy.wait(3000)

    })
})