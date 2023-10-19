# Different Cypress Scenarios which we handle in our daily project

  Cypress Examples

1.  Submit the form  without passing click => newTab.js 

     NOTE - Cypress does not support tab. So, we need to follow 2 steps 
     Step 1. Run **npm install -D cypress-plugin-tab**
     Step 2. Add **require('cypress-plugin-tab')** at the top of cypress/support/index.js:
     
2. Find Text using variables and alias => findText.cy.js
3. Passing Enter as input value => typeEnter.cy.js
4. Test Responsiveness, using different viewports => webResponsive.cy.js
5. Change Different Browsers in test => defineBrowser.cy.js
6. Open New Tab in cypress => newTab.js
7. Find the Length of elements on Page => findLength.cy.js
8. alert Test => alertTest.cy.js
9. Opening google in different ways => google.cy.js
10. Check if an element exist on the page => assertion2.cy.js
11. Upload File using .selectFile() => fileUpload.cy.js
12. Drag and drop =>dragAndDrop.cy.js
13. Move Hover using 2 ways: Cypress Command and Third-party plugin => mouseHover.js
14. broken Links on the page => brokenLink.cy.js
15. How to find current date => currentDate.cy.js
16. How to avoid delay while entering text in Cypres => delayExample.cy.js
17. Disable test in Cypress => disableTest.cy.js
18. Select a value from dropdown => dropdown.cy.js
19. Run test based on browser => defineBrowser.cy.js
20. Pick value based on environment variable in Cypress => envVariable.cy.js
21. Fetch csv value => fetchCsv.cy.js
22. Ignore case sensitivity in Cypress => ignoreCaseSensitivity.cy.js
23. Monkey Test in Cypress => monkeyTest.cy.js
24. Multi Origin Test in Cypress => multiOrigin.cy.js
25. Pause Execution in Cypress => pauseExecution.cy.js
26. How to refresh page in Cypress => refreshPage.cy.js
27. Perform Scroll in Cypress => scrollInToView.cy.js
28. Skip test based on browser and operating system => skipTest_conditionalBasis.cy.js
29. How to access value from different test in Cypress => accessValueFromOtherTest.cy.js , Login.cy.js and sharedFunction.cy.js
30. Take screenshot of command or screenshot of whole page in Cypress => takeScreenshot.cy.js
31. Disable image on loading the page in Cypress => imageDisable.cy.js
32. Handle Exception in Cypress => cypressException.cy.js
33. Automate home page in Cypress => homePage.cy.js
34. Handle Pagination in Cypress => paginationTest.cy.js
35. Read data from Fixture => readFixtures.cy.js
36. Automate login using data driven approach in Cypress => dataDrivenTest.cy.js
37. Cypress test genaretad from Cypress STudio => cypress_studio.cy.js
38. How to test reponsiveness of page in Cypress / Testing on different viewports => webResponsive.cy.js
39. Test differnt HTTP Methods in Cypress.. Perform API testing => api.cy.js
40. Handle checkbox in Cypress => checkbox.cy.js
41. Blur and focus on an element in Cypress => blurAndFocus.cy.js
42. Read data from Excel in Cypress => readExcelData.cy.js
 => Run "npm install node-xlsx --save"
43. How to handle tool tip
44. How to handle basic auth headers

