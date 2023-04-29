describe(' Drag and Drop', () => {
    const capitals = ["Stockholm", "Oslo", "Seoul", "Rome", "Madrid", "Copenhagen", "Washington"];
    const countries = ["Sweden", "Norway", "South Korea", "Italy", "Spain", "Denmark", "United States"];

    beforeEach(() => {
        cy.visit('http://dhtmlgoodies.com/scripts/drag-drop-custom/demo-drag-drop-3.html')
    })

    function moveCapitalToCountry(dragElement, dropElement) {
        cy.get('div[id^=box]:contains(' + dragElement + ')').trigger('mousedown', { which: 1 })
        cy.wait(100)
        cy.get('div[id^=box]:contains(' + dropElement + ')').trigger('mousemove').trigger('mouseup', { force: true })
    }
    function moveBackCapital(dragElement) {
        cy.get('div[id^=box].dragableBox:contains(' + dragElement + ')').trigger('mousedown', { which: 1 })
        cy.wait(100)
        cy.get('div#dropContent').invoke('css', 'height', '200px').trigger('mousemove').trigger('mouseup', { force: true })
    }
    function verifyColor(dragElement) {
        cy.get('div[id^=box].dragableBox:contains(' + dragElement + ')').should('be.visible')
            .should('have.css', 'background-color', 'rgb(0, 255, 0)')
    }

    it('TC1 || Positive Use Case|| Drag all the capitals to the respective country section', () => {


        countries.forEach((country, index) => {
            const capital = capitals[index];
            moveCapitalToCountry(capital, country);

        });


        capitals.forEach(capital => {
            verifyColor(capital)
            moveBackCapital(capital);
        })




    })
    it('TC2 || Negative Use Case|| Drag all the capitals to the wrong countries', () => {

        moveCapitalToCountry("Stockholm", "Denmark")
        moveCapitalToCountry("Rome", "Norway")
        moveCapitalToCountry("Oslo", "Italy")
        moveCapitalToCountry("Copenhagen", "United States")
        moveCapitalToCountry("Madrid", "South Korea")
        moveCapitalToCountry("Washington", "Spain")
        moveCapitalToCountry("Seoul", "Sweden")


        capitals.forEach(capital => {
            moveBackCapital(capital);
        })

    })

    it('TC3 || Combination of Positive and Negative Use Case', () => {


        moveCapitalToCountry("Stockholm", "Sweden")
        moveCapitalToCountry("Rome", "Italy")
        moveCapitalToCountry("Oslo", "Norway")
        moveCapitalToCountry("Copenhagen", "United States")
        moveCapitalToCountry("Madrid", "Spain")
        moveCapitalToCountry("Washington", "South Korea")
        moveCapitalToCountry("Seoul", "Denmark")


        capitals.forEach(capital => {
            moveBackCapital(capital);
        })

    })

})