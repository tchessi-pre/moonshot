import user from '../fixtures/user.json';

describe('Login template', () => {
	// Test pour les champs vides
	it('should show validation errors when leaving all fields blank', () => {
		cy.login(' ', ' ');
		cy.checkErrorLogin('Veuillez saisir une adresse électronique valide');
	});

	// Test pour un email invalide
	it('should show validation errors when entering invalid email', () => {
		cy.login('invalid-email', ' ');
		cy.checkErrorLogin('Veuillez saisir une adresse électronique valide');
	});

	// Test pour un email valide et un champ mot de passe vide
	it('should show validation errors when entering valid email and blank password field', () => {
		cy.visit('/login');
		cy.get('#email').type(user.email);
		cy.get('button[type="submit"]').click();
		cy.checkErrorLogin('Veuillez saisir votre mot de passe');
	});

	// Test pour un email valide et un mot de passe incorrect
	it('should show validation errors when entering valid email and invalid password', () => {
		cy.intercept('POST', '/auth/login').as('loginRequest');
		cy.login(user.email, 'wrongPassword');
		cy.wait('@loginRequest').then((interception) => {
			expect(interception.response.statusCode).to.eq(401);
		});
		cy.checkErrorLogin(
			'Votre identifiant ou votre mot de passe sont incorrects'
		);
	});

	// Test pour un email et un mot de passe valides
	it('should redirect to home page when entering valid email and password', () => {
		cy.intercept('POST', '/auth/login').as('loginRequest');
		cy.login(user.email, user.password);
		cy.wait('@loginRequest').then((interception) => {
			expect(interception.response.statusCode).to.eq(200);
		});

		cy.url().should('include', '/events');
	});
});
