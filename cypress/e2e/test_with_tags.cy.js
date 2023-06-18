import { onlyOn, skipOn } from '@cypress/skip-test'

describe('My Test Suite', () => {
    it('Test Case 1', { tags: 'smoke' }, () => {
        cy.visit(
            "https://bstackdemo.com/")
        cy.get('.shelf-item__buy-btn').first().click();
    })

    it('Test Case 2', { tags: 'regression' }, () => {
        cy.visit(
            "https://bstackdemo.com/")
        cy.get('.shelf-item__buy-btn').eq(1).click(); 
    })

                      

    it('Test Case 3', { tags: ['smoke', 'regression'] }, () => {
        cy.visit(
            "https://bstackdemo.com/")
        cy.get('.shelf-item__buy-btn').eq(2).click();
    })
})


