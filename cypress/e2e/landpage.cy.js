describe('AlgoSuite Landing Page', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should navigate to the shortcuts page on "Shortcuts" button click', () => {
        cy.contains('button', 'Shortcuts').click();
        cy.url().should('include', '/shortcuts');
    });

    it('should navigate to the docs page on "Docs" button click', () => {
        cy.contains('button', 'Docs').click();
        cy.url().should('include', '/docs');
    });

    it('should not allow direct access to dashboard when not logged in', () => {
        cy.visit('/private/dashboard');
        cy.url().should('include', '/auth');
      });

      it('should allow access to dashboard after successful login', () => {
        cy.window().then((win) => {
          win['store'] = {
            select: (selector) => {
              if (selector === 'isLoggedIn') {
                return {
                  pipe: () => ({ subscribe: (fn) => fn(true) })
                };
              }
            }
          };
        });
    
        cy.visit('/private/dashboard');
        cy.url().should('include', '/private/dashboard');
      });
});
