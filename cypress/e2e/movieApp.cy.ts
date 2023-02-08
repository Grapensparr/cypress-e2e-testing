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

describe('Should test the display of mock movies', () => {
    it('Should display list of mock movies', () => {
        cy.intercept('GET', 'http://omdbapi.com/?apikey=416ed51a&s=*', {fixture: 'mockListOfMovies'}).as('MockCall');
        cy.get('#searchText').type('Remember Me').should('have.value', 'Remember Me');
        cy.get('form').submit();
        
        cy.get('#movie-container > div').should('have.length', 5);
        cy.get('#movie-container > div').should('have.class', 'movie');
        cy.get('.movie > h3').should('have.length', 5);
        cy.get('.movie > img').should('have.length', 5);
        cy.get('h3').should('contain', 'Remember Me');
        cy.get('h3').should('contain', 'The Green Mile');
        cy.get('h3').should('contain', 'The Departed');
        cy.get('h3').should('contain', 'Anaconda');
        cy.get('h3').should('contain', 'Shutter Island');
    });
});

describe('Should test error message', () => {
    it('Should display an error message, clear field', () => {
        cy.get('#searchText').clear();
        cy.get('form').submit();
        cy.get('p').contains('Inga sökresultat att visa');
    });

    it('Should display an error message, no results', () => {
        cy.get('#searchText').type('asdfgh').should("have.value", 'asdfgh');
        cy.get('form').submit();
        cy.get('p').contains('Inga sökresultat att visa');
    });
});