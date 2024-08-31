// cypress/support/index.d.ts

// Étendre l'interface Cypress pour ajouter les commandes personnalisées
declare namespace Cypress {
	interface Chainable<Subject = any> {
		login(email: string, password: string): Chainable<void>;
		checkErrorLogin(errorMessage: string): Chainable<void>;
	}
}
