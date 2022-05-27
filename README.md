# Practise_QA


Repo for practising cypress cases

1. Cypress/Integration/TabTest --> How to submit the form  without passing locators 


    NOTE - Cypress does not support tab. So, we need to follow 2 steps 

     Step 1. Run **npm install -D cypress-plugin-tab**
     
     Step 2. Add **require('cypress-plugin-tab')** at the top of cypress/support/index.js:


<img width="1210" alt="image" src="https://user-images.githubusercontent.com/10338077/170794883-83efbdd2-9d4a-40a8-b1ac-ea2c5aa983e2.png">
