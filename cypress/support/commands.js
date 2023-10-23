// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('screenshotWithTimestamp', (name) => {
    const timestamp = new Date().toLocaleString();
    const fileName = `${name}-${timestamp}`;

    cy.log(`Taking screenshot: ${fileName}`);

    cy.screenshot(fileName, { capture: 'viewport' });

    cy.get('body').then(($body) => {
        const $dateTime = Cypress.$(`<div>${timestamp}</div>`);
        $body.append($dateTime);
        cy.log(`Timestamp: ${timestamp}`);
    });
});
Cypress.Commands.add('dragAndDrop', (dragElement, dropElement) => {
    cy.get('div[id^=box]:contains(' + dragElement + ')').trigger('mousedown', { which: 1 })
    cy.get('div[id^=box]:contains(' + dropElement + ')').trigger('mousemove').trigger('mouseup', { force: true })
    cy.wait(2000)

})
/* Access this command in other tests 
In below code, first the value is stored as alias using cy.wrap(value).as('sumOfNumbers').
Then, using cy.get('@sumOfNumbers') => It retrieves the value stored in sumOfNumbers

*/
Cypress.Commands.add('sumTest', (first, second) => {
    const value = first + second
    cy.wrap(value).as('sumOfNumbers')
    return cy.get('@sumOfNumbers').then((value) => {
        return value;
    })

})



Cypress.Commands.add('sum', (first, second) => {
    const value = first + second
    return cy.wrap(value);

})
Cypress.Commands.add('loginBasicAuth', () => {
    cy.visit('https://authenticationtest.com/HTTPAuth/', {
        auth: {
            username: 'user',
            password: 'pass'
        }
    })
})


Cypress.Commands.add('verifyCountry', (country_code) => {
    switch (country_code) {
        case '/in/':
            return 'India'
        case '/uk/':
            return 'United Kingdom'
        case '/ae/':
            return 'United Arab Emirates'
        case '/ca/':
            return 'Canada (English)'
        default:
            return 'United Arab Emirates'

    }
})