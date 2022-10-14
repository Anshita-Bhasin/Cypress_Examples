const screen = ['iphone-8', 'ipad-2', [1024, 768], 'macbook-13']
const orienatation = ['landscape', 'portrait']


describe('Testing different screen size and orienatation', () => {
    screen.forEach((screenView) => {
        it('Should display viewport for the screens=> Iphone-8,ipad-2 ,macbook-13', () => {

            if (Cypress._.isArray(screenView)) {
                cy.viewport(screenView[0], screenView[1])
                cy.log("printing viewports", screenView[0], screenView[1])
            }
            else {
                cy.viewport(screenView)
            }
            cy.visit('https://www.tradeling.com');

        })
    });
    it('Open website in iphone-xr viewport and then navigate back to the first page', () => {

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

    orienatation.forEach((orienatation) => {
        it('Testing different orientation', () => {
            cy.visit("https://www.dropbox.com/")
            cy.viewport('iphone-5', orienatation);
            ;

        })


    })

    it('Testing customized width and height', () => {
        cy.visit("https://www.dropbox.com/")
        cy.viewport(360, 890);
    })



});

