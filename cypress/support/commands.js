Cypress.Commands.add('mockStore', (initialState = {}) => {
    cy.window().then((win) => {
      win['store'] = {
        select: (selector) => {
          if (selector === 'isLoggedIn') {
            return {
              pipe: () => ({ subscribe: (fn) => fn(true) })
            };
          }
          if (selector === 'user') {
            return {
              pipe: () => ({
                subscribe: (fn) => fn({
                  name: 'Kaustubh',
                })
              })
            };
          }
          return {
            pipe: () => ({ subscribe: (fn) => fn(null) })
          };
        },
        dispatch: (action) => {
          console.log('Dispatched action:', action);
          return action;
        }
      };
    });
  });


  Cypress.Commands.add('login', () => {
    cy.mockStore({
      auth: {
        isLoggedIn: true,
        user: {
          name: 'Kaustubh'
        }
      }
    });
  });