import user from '../fixtures/user.json';

describe("Tests d'Inscription", () => {
	// Avant chaque test, vous pouvez nettoyer les données si nécessaire
	beforeEach(() => {
		// Par exemple, vous pouvez nettoyer la base de données ou réinitialiser l'état de l'application
	});

	// Test 1: Champs vides
	it("devrait afficher des erreurs de validation lorsqu'on laisse tous les champs vides", () => {
		cy.register({
			username: '',
			firstName: '',
			lastName: '',
			email: '',
			birthdate: '',
			password: '',
			confirmPassword: '',
		});
		cy.checkErrorRegister('Veuillez remplir tous les champs requis');
	});

	// Test 2: Email déjà existant
	it("devrait afficher une erreur lorsque l'email est déjà enregistré", () => {
		cy.intercept('POST', '/auth/local/register', {
			statusCode: 400,
			body: {
				message: [
					{
						messages: [{ message: 'Cet email est déjà utilisé.' }],
					},
				],
			},
		}).as('registerRequest');

		cy.register({
			username: 'existinguser',
			firstName: 'John',
			lastName: 'Doe',
			email: 'existingemail@example.com',
			birthdate: '1990-01-01',
			password: 'password123',
			confirmPassword: 'password123',
		});

		cy.wait('@registerRequest');
		cy.checkErrorRegister('Cet email est déjà utilisé.');
	});

	// Test 3: Mot de passe et confirmation ne correspondent pas
	it('devrait afficher une erreur lorsque le mot de passe et sa confirmation ne correspondent pas', () => {
		cy.register({
			username: 'newuser',
			firstName: 'Jane',
			lastName: 'Doe',
			email: 'jane.doe@example.com',
			birthdate: '1992-02-02',
			password: 'password123',
			confirmPassword: 'password456', 
		});
		cy.checkErrorRegister('Les mots de passe ne correspondent pas.');
	});

	// Test 4: Mot de passe trop court
	it('devrait afficher une erreur lorsque le mot de passe est trop court', () => {
		cy.register({
			username: 'shortpassworduser',
			firstName: 'Short',
			lastName: 'Password',
			email: 'short.password@example.com',
			birthdate: '1995-05-05',
			password: '123',
			confirmPassword: '123',
		});
		cy.checkErrorRegister(
			'Le mot de passe doit contenir au moins 6 caractères.'
		);
	});

	// Test 5: Enregistrement réussi
	it("devrait enregistrer un nouvel utilisateur et rediriger vers la page d'accueil", () => {
		cy.intercept('POST', '/auth/local/register', {
			statusCode: 200,
			body: {
				jwt: 'fake-jwt-token',
				user: {
					id: 'new-user-id',
					email: user.email,
					username: user.username,
					firstName: user.firstName,
					lastName: user.lastName,
					birthdate: user.birthdate,
				},
			},
		}).as('registerRequest');

		cy.register({
			username: user.username,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			birthdate: user.birthdate,
			password: user.password,
			confirmPassword: user.password,
		});

		cy.wait('@registerRequest').then((interception) => {
			expect(interception.response.statusCode).to.eq(200);
			expect(interception.response.body.user.email).to.eq(user.email);
			expect(interception.response.body.user.username).to.eq(user.username);
    });
    
		// Vérifie la redirection après l'inscription
		cy.url().should('include', '/login');
	});
});
