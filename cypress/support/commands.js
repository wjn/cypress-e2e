// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('login', (username, password) => {
	cy.get('#user_login').should('be.visible').and('be.enabled').type(username)
	cy.get('#user_password').should('be.visible').and('be.enabled').type(password)
	cy.get('#user_remember_me')
		.should('be.visible')
		.and('be.enabled')
		.click()
		.should('be.checked')
	cy.get('input[type="submit"][value="Sign in"]')
		.should('be.visible')
		.and('be.enabled')
		.click()
})

Cypress.Commands.add('logout', () => {
	cy.get(':nth-child(3) > .dropdown-toggle').should('be.visible').click()
	cy.get('#logout_link').should('be.visible').click()
})
