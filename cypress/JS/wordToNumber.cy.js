import wordsToNumbers from 'words-to-numbers';
describe('Word to num', () => {

    it('Word to num', () => {
        cy.log("=== print Word to num === " + wordsToNumbers('one hundred'))
        cy.log("=== print Word to num === " + wordsToNumbers('one hundred thousand'))

        cy.log("=== print Word to num === " + wordsToNumbers('one billion'))
        cy.log("=== print Word to num === " + wordsToNumbers('nine thousand'))
    })


})