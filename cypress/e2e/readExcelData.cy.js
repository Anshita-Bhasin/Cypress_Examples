let filePath, sheetName
describe('Read Data from Excel', () => {


    it('Read Data', () => {
        cy.visit('https://naveenautomationlabs.com/opencart/index.php?route=account/register')
        filePath = 'cypress//testData//registerData.xlsx'
        sheetName = 'Sheet1'


        cy.task('readDataFromExcel', {
            filePath, sheetName
        })
            .then((rows) => {
                cy.get('input[name="firstname"').type(rows[0].Name)
                cy.get('input[name="lastname"').type(rows[0].Name)

            });

    })




})