const { defineConfig } = require("cypress");

module.exports = defineConfig({
	e2e: {
		experimentalStudio: true,
		baseUrl: 'http://localhost:3000',
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},

	component: {
		devServer: {
			framework: 'next',
			bundler: 'webpack',
		},
	},
});
