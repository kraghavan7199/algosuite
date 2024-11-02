// Example in your test file

describe('Dahboard Page - Feature Exploration', () => {
    before(() => {
      cy.request('POST', `${Cypress.env('apiUrl')}/auth/login`, {
        email: 'test@gmail.com',
        password: 'somePass'
      }).then((response) => {
        window.localStorage.setItem('authToken', response.body.token);
      });
    });
  
    beforeEach(() => {
        cy.login()
        cy.visit('/private/dashboard')
    });
  
    it('should display welcome message and feature cards when logged in', () => {
        // Check that the welcome message is displayed with user's name
        cy.contains('h1', 'Welcome,').should('be.visible');
        cy.contains('p.lead', 'Explore these features:').should('be.visible');
    
        // Verify the feature cards are displayed
        cy.get('.card').should('have.length', 4); // Ensure all feature cards are present
    
        // Check each card title
        cy.contains('.card-title', 'String Analysis').should('be.visible');
        cy.contains('.card-title', 'Binary Tree Visualization').should('be.visible');
        cy.contains('.card-title', 'Shortcuts').should('be.visible');
        cy.contains('.card-title', 'Documentation').should('be.visible');
      });
  });
  