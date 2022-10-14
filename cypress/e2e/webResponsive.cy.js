const screen = ['iphone-8', 'ipad-2', [1024, 768], 'macbook-13']

describe('Testing different viewports scenarios', () => {
    screen.forEach((screenView) => {
        it('Should display viewport as per defined screens', () => {

            if (Cypress._.isArray(screenView)) {
                cy.viewport(screenView[0], screenView[1])
            }
            else {
                cy.viewport(screenView)
            }
            cy.visit('https://www.tradeling.com');

        })
    });
    it('Open website in given viewport and then navigate back to the page', () => {

        cy.viewport('iphone-xr')
        cy.visit('https://www.tradeling.com');
        cy.get('[data-testid="rfq-ctas"]').first().click();
        cy.go(-1);

    })

    it('open youtube in mobile web , perform action and again search for new text', () => {

        cy.viewport('samsung-s10')
        cy.visit("https://www.youtube.com");
        cy.get(' yt-icon-button#search-button-narrow').type('automation')
        cy.get('ul[role="listbox"]').contains("automation course").click();
        cy.wait(5000);
        cy.get('yt-icon.topbar-icons.style-scope.ytd-masthead').click()
        cy.get('input#search').clear().type('node js')


    })

});

