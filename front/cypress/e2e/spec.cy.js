describe('Test E2E de la fonctionnalité de connexion', () => {
	beforeEach(() => {
		// Accéder à la page de connexion avant chaque test
		cy.visit('http://localhost:3000/login'); // Remplacez l'URL par celle de votre page de connexion
	});

	it('devrait permettre à un utilisateur de se connecter avec des informations valides', () => {
		// Saisir l'email
		cy.get('input[name="email"]').type('test@example.com'); // Remplacez par le sélecteur correct

		// Saisir le mot de passe
		cy.get('input[name="password"]').type('password123'); // Remplacez par le sélecteur correct

		// Cliquer sur le bouton de soumission
		cy.get('button[type="submit"]').click(); // Remplacez par le sélecteur correct

		// Vérifier que l'utilisateur est redirigé vers le tableau de bord ou une page d'accueil
		cy.url().should('include', '/dashboard'); // Remplacez '/dashboard' par la route correcte

		// Vérifier que l'utilisateur est connecté (par exemple, en vérifiant la présence de son nom ou d'un élément spécifique)
		cy.get('h1').should('contain', 'Bienvenue'); // Remplacez par un élément ou texte spécifique à votre application
	});

	it('devrait afficher une erreur pour des informations de connexion invalides', () => {
		// Saisir un email incorrect
		cy.get('input[name="email"]').type('wrong@example.com');

		// Saisir un mot de passe incorrect
		cy.get('input[name="password"]').type('wrongpassword');

		// Cliquer sur le bouton de soumission
		cy.get('button[type="submit"]').click();

		// Vérifier que le message d'erreur est affiché
		cy.get('.error-message') // Remplacez par le sélecteur de votre message d'erreur
			.should('be.visible')
			.and('contain', 'Identifiant ou mot de passe incorrect'); // Remplacez par le message d'erreur correct
	});
});
