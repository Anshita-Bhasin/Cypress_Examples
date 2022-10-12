describe(' Open link in same tab',()=>
{});
<<<<<<< HEAD:cypress/integration/newTab.js
    it.only('loads the page using approach1', () => {
=======
    it.only('loads the about page', () => {
>>>>>>> 167a785 (Open tab):cypress/e2e/newTab.js
    cy.visit('https://test.io/coverage/website-testing')
    cy.get('a.cta-button__button.button-cta--get-a-demo').first()
    .invoke('attr','target','_self').click({force:true})

  
  });

<<<<<<< HEAD:cypress/integration/newTab.js
  it.only('loads the page using approach2', () => {
    cy.visit('https://test.io/coverage/website-testing')
    cy.get('button#onetrust-accept-btn-handler').click()    
    cy.get('a.cta-button__button.button-cta--get-a-demo').first()
    .invoke('removeAttr','target').click({force:true});});
=======
  it.only('loads the about page2 ', () => {
    cy.visit('https://test.io/coverage/website-testing')
    cy.get('button#onetrust-accept-btn-handler').click()    
    cy.get('a.cta-button__button.button-cta--get-a-demo').first()
    .invoke('removeAttr','target').click({force:true});});
>>>>>>> 167a785 (Open tab):cypress/e2e/newTab.js
