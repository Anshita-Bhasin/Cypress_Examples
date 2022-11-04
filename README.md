# Different Cypress Scenarios which we handle in our daily project
Repo for practising cypress cases

1.  Submit the form  without passing locators => newTab.js
    NOTE - Cypress does not support tab. So, we need to follow 2 steps 
     Step 1. Run **npm install -D cypress-plugin-tab**
     Step 2. Add **require('cypress-plugin-tab')** at the top of cypress/support/index.js:
     
2. Find Text using variables and alias => findText.cy.js
3. Passing Enter as input value => typeEnter.cy.js
4. Test Responsiveness , using different viewports => webResponsive.cy.js
5. Change Different Browsers in test => defineBrowser.cy.js
6. Open New Tab in cypress => newTab.js
7. Handle Alert => alertTest.cy.js
8. Find Length of elements on Page => findLength.cy.js
9. Opening google in different ways => google.cy.js
