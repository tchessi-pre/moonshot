
// Commande pour simuler le login
Cypress.Commands.add('login', (email, password) => {
	cy.visit('/login'); // Assure que l'URL est correcte
	cy.get('#email').type(email); 
	cy.get('#password').type(password);
	cy.get('button[type="submit"]').click(); 
});

// Commande pour vérifier les erreurs de login
Cypress.Commands.add('checkErrorLogin', (errorMessage) => {
	cy.get('.error-message').should('be.visible').and('contain', errorMessage);
});

// Commande pour simuler l'inscription
Cypress.Commands.add('register', (userData) => {
	cy.visit('/register'); 
	cy.get('#username').type(userData.username);
	cy.get('#firstName').type(userData.firstName);
	cy.get('#lastName').type(userData.lastName);
	cy.get('#email').type(userData.email);
	cy.get('#birthdate').type(userData.birthdate);
	cy.get('#password').type(userData.password);
	cy.get('#confirmPassword').type(userData.confirmPassword);
	cy.get('button[type="submit"]').click();
});

// Commande pour vérifier les erreurs d'inscription
Cypress.Commands.add('checkErrorRegister', (errorMessage) => {
	cy.get('.error-message').should('be.visible').and('contain', errorMessage);
});
