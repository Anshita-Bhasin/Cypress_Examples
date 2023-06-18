describe('Registration Flow Using Fixture Data', () => {

    it('Enter the form details', () => {
        cy.visit('https://naveenautomationlabs.com/opencart/index.php?route=account/register')
        cy.fixture('register').then((data) => {
            cy.get('#input-firstname').type(data.name.first_name)
            cy.get('#input-lastname').type(data.name.last_name)
            cy.get('#input-email').type(data.email)
            cy.get('#input-telephone').type(data.phone)
            cy.get('#input-password').type(data.login.password)
            cy.get('#input-confirm').type(data.login.password)
        })

        cy.get('input[type="radio"]').eq(1).check()
        cy.get('input[type="checkbox"]').check()
        cy.get('.btn.btn-primary').click()

        cy.contains('Your Account Has Been Created!').should('have.text', 'Your Account Has Been Created!')

    })
})