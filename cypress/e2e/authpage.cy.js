describe('Authentication Page Tests', () => {
    beforeEach(() => {
      cy.visit('/auth')
    });
    describe('UI Elements', () => {
    
        it('should switch between login and signup forms', () => {
          cy.get('#login').should('be.visible')
          
          cy.get('#signup-tab').click()
          cy.get('#signup').should('be.visible')
          cy.get('#login').should('not.be.visible')
          
          cy.get('#login-tab').click()
          cy.get('#login').should('be.visible')
          cy.get('#signup').should('not.be.visible')
        })
      })

      describe('Login Form Validation', () => {
        beforeEach(() => {
          cy.get('#login-tab').click()
        })
    
        it('should allow submission with valid credentials', () => {
          cy.get('#loginEmail').type('test@gmail.com')
          cy.get('#loginPassword').type('somePass')
          cy.get('#login form').submit()
          cy.url().should('include', '/dashboard')
        })
      })

      
  describe('Signup Form Validation', () => {
    beforeEach(() => {
      cy.get('#signup-tab').click()
    })


    it('should allow submission with valid information', () => {
      cy.get('#signupName').type('Test User')
      cy.get('#signupEmail').type('newuser@example.com')
      cy.get('#signupPassword').type('password123')
      cy.get('#signup form').submit()
      cy.url().should('include', '/dashboard')
    })
  })


});