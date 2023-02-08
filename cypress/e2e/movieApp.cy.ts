beforeEach(() => {
    cy.visit('/');
});

describe('Should test page setup', () => {
    it('Should have a search form', () => {
        cy.get('#searchForm');
    });

    it('Should have a movie container', () => {
        cy.get('#movie-container');
    });
});

describe('Should test error message', () => {
    it('Should display an error message, clear field', () => {
        cy.get('#searchText').clear();
        cy.get('#search').click();
        cy.get('p').contains('Inga sökresultat att visa');
    });

    it('Should display an error message, no results', () => {
        cy.get('#searchText').type('asdfgh');
        cy.get('#search').click();
        cy.get('p').contains('Inga sökresultat att visa');
    });
});