import { onlyOn, skipOn } from '@cypress/skip-test'

describe("Conditionally disable test in Cypress using plugin", () => {


    it("Only on Chrome, Open URL and add product to cart", () => {
        cy.onlyOn('chrome')
        cy.visit(
            "https://bstackdemo.com/")
        cy.get('.shelf-item__buy-btn').first().click();

    });

    it("Only on Firefox, Open URL and add product to cart", () => {
        cy.onlyOn('firefox')
        cy.visit(
            "https://bstackdemo.com/")
        cy.get('.shelf-item__buy-btn').first().click();

    });

    it("Skip on Window, Open URL and add product to cart", () => {
        cy.skipOn('windows')
        cy.visit(
            "https://bstackdemo.com/")
        cy.get('.shelf-item__buy-btn').first().click();

    });

    it("Skip on MAC, Open URL and add product to cart", () => {
        cy.skipOn('mac')
        cy.visit(
            "https://bstackdemo.com/")
        cy.get('.shelf-item__buy-btn').first().click();

    });

    it("Skip on Windows, Run only on Mac and Browser Chrome", () => {
        skipOn('windows')
        //  cy.onlyOn("mac").onlyOn('chrome')
        cy.visit(
            "https://bstackdemo.com/")
        cy.get('.shelf-item__buy-btn').first().click();

    });
    it("Run on Firefox", () => {
        onlyOn("firefox")
        cy.visit(
            "https://bstackdemo.com/")
        cy.get('.shelf-item__buy-btn').first().click();

    });


    it("Skip on Firefox, Run only on Mac and Browser Chrome", () => {
        skipOn('firefox')
        cy.onlyOn("mac").onlyOn('chrome')
        cy.visit(
            "https://bstackdemo.com/")
        cy.get('.shelf-item__buy-btn').first().click();

    });


});
