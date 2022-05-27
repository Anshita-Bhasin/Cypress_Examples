# Practise_QA


Repo for practising cypress cases

1. Cypress/Integration/TabTest --> How to submit the form  without passing locators 


NOTE - Cypress does not support tab. So, we need to add plugin to dependencies. 
Run **npm install -D cypress-plugin-tab**
Add **require('cypress-plugin-tab')** at the top of cypress/support/index.js:


