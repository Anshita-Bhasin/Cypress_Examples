describe('example for typing the text in input without passing any locator', () => {
  beforeEach(() => {
    cy.visit('https://demo.opencart.com/index.php?route=account/register')
  })

  const dataJson = require('../fixtures/testData.json');
  const input_firstName = dataJson.firstName;
  const input_lastName = dataJson.lastName;
  const input_mobileNumber= dataJson.mobileNumber;
  const input_password = dataJson.password;
  const input_email=dataJson.email;



  it('Input values in the textbox and click on submit ', () => {

   cy.get('input#input-firstname').type(input_firstName)
       .tab().type(input_lastName)
       .tab().type(input_email)
       .tab().type(input_mobileNumber)
       .tab().type(input_password)
       .tab().type(input_password)
       .tab().tab().tab().tab().check().tab().click();



  })


})