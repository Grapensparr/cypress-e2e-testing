beforeEach(() => {
    cy.visit('/');
});

describe('Should test page setup', () => {
    it('Should have a search form', () => {
        cy.get('#searchForm');
        cy.get('#searchText');
        cy.get('#search');
    });

    it('Should have a movie container', () => {
        cy.get('#movie-container');
    });
});

describe('Should test the retrieval of data from the API', () => {
    it("Should display list of results from the actual API", () => {
        cy.get('#searchText').type('Avatar').should('have.value', 'Avatar');
        cy.get('form').submit();
    
        cy.get('#movie-container > div').should('have.class', 'movie');
        cy.get('#movie-container > div').should('have.length', 10);
        cy.get('.movie > img').should('have.length', 10);
        cy.get('.movie > h3').should('have.length', 10);
        cy.get('.movie > h3').should('contain', 'Avatar');
    });

    it('Should display an error message, clear field', () => {
        cy.get('#searchText').should('have.value', '');
        cy.get('form').submit();
        cy.get('p').contains('Inga sökresultat att visa');
    });

    it('Should display an error message, no results found', () => {
        cy.get('#searchText').type('asdfgh').should("have.value", 'asdfgh');
        cy.get('form').submit();
        cy.get('p').contains('Inga sökresultat att visa');
    });

    it('Should display an error message, unable to fetch data', () => {
        //Using intercept to return an empty array when fetching data from the API. This simulates the situation where the API is unable to fetch data.
        cy.intercept('GET', 'http://omdbapi.com/?apikey=416ed51a&s=*', { success: [] });
        cy.get('#searchText').type('Avatar').should("have.value", 'Avatar');
        cy.get('form').submit();
        cy.get('p').contains('Inga sökresultat att visa');
    });
});

describe('Should test the display of mock movies', () => {
    it('Should display list of mock movies', () => {
        cy.intercept('GET', 'http://omdbapi.com/?apikey=416ed51a&s=*', { fixture: 'mockListOfMovies' });
        cy.get('#searchText').type('Remember Me').should('have.value', 'Remember Me');
        cy.get('form').submit();
        
        cy.get('#movie-container > div').should('have.class', 'movie');
        cy.get('#movie-container > div').should('have.length', 5);
        cy.get('.movie > img').should('have.length', 5);
        cy.get('.movie > h3').should('have.length', 5);
        cy.get('.movie > h3').should('contain', 'Remember Me');
        cy.get('.movie > h3').should('contain', 'The Green Mile');
        cy.get('.movie > h3').should('contain', 'The Departed');
        cy.get('.movie > h3').should('contain', 'Anaconda');
        cy.get('.movie > h3').should('contain', 'Shutter Island');
    });
});