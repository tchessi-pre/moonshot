describe('User Registration and Event Creation', () => {
	beforeEach(() => {
		cy.clearLocalStorage();
		cy.clearCookies();
	});

	it('should register a new user successfully', () => {
		// Charger les données de l'utilisateur depuis un fichier fixture
		cy.fixture('user').then((user) => {
			cy.register(user);
		});

		// Vérifier le succès de l'inscription ou redirection
		cy.url().should('include', '/dashboard');
	});

	it('should display validation errors during registration', () => {
		// Charger les données de l'utilisateur avec des champs vides
		cy.fixture('user').then((user) => {
			user.email = ''; // Effacer l'email pour simuler un champ vide
			cy.register(user);
		});

		// Vérifier qu'un message d'erreur est affiché
		cy.checkErrorRegister('Veuillez entrer une adresse email valide.');
	});

	it('should login successfully', () => {
		// Charger les données de connexion depuis un fichier fixture
		cy.fixture('user').then((user) => {
			cy.login(user.email, user.password);
		});

		// Vérifier la redirection après la connexion
		cy.url().should('include', '/dashboard');
	});

	it('should display login errors with incorrect credentials', () => {
		cy.login('wrong@example.com', 'incorrectpassword');

		// Vérifier le message d'erreur
		cy.checkErrorLogin('Identifiants incorrects.');
	});

	it('should create an event successfully', () => {
		cy.fixture('events').then((events) => {
			const validEvent = events.validEvent;

			cy.login('testuser@example.com', 'Password123'); // Connexion avant la création de l'événement

			cy.visit('/create_event');
			cy.get('#eventName').type(validEvent.eventName);
			cy.get('#place').type(validEvent.place);
			cy.get('#date').type(validEvent.date);
			cy.get('#time').type(validEvent.time);
			cy.get('#eventType').select(validEvent.eventType);
			cy.get('#number').type(validEvent.number);
			cy.get('#price').type(validEvent.price);
			cy.get('#lien').type(validEvent.lien);
			cy.get('#description').type(validEvent.description);
			cy.get('#image').selectFile(`cypress/fixtures/${validEvent.image}`);
			cy.get('#acceptTerms').check();
			cy.get('button[type="submit"]').click();

			// Vérifier la création de l'événement
			cy.get('.text-green-500').should(
				'contain',
				'Événement créé avec succès!'
			);
		});
	});
});
