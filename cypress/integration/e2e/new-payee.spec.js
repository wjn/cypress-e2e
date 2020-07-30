import LoginPage from '../../classes/LoginPage.class'

Cypress.on('uncaught:exception', (err, runnable) => {
	// returning false here prevents Cypress from
	// failing the test for an unexpected token
	return false
})

describe('New Payee Test', () => {
	before(() => {
		LoginPage.loginToSite()
	})
	beforeEach(() => {
		// preserves session id across tests so that we don't get logged out.
		Cypress.Cookies.preserveOnce('JSESSIONID')
	})

	after(() => {
		cy.logout()
	})

	it('should navigate to Pay Bills Screen', () => {
		cy.get('#pay_bills_tab > a').should('be.visible').click()
		cy.get('div#tabs ul.ui-tabs-nav')
			.should('be.visible')
			.as('subnav')
			.children()
			.and('have.length', 3)
		cy.get('div#tabs ul.ui-tabs-nav > li:nth-child(2) > a')
			.should('contain', 'Add New Payee')
			.click()
		cy.get('#ui-tabs-2 > .board-header').should(
			'contain',
			'Who are you paying?'
		)
	})

	it('should add a new payee to the list', () => {
		cy.fixture('user').then(user => {
			cy.get('#np_new_payee_name')
				.as('np_name')
				.should('be.visible')
				.and('have.attr', 'required', 'required')
				.type(user.name)
			cy.get('#np_new_payee_address')
				.as('np_address')
				.should('be.visible')
				.and('have.attr', 'required', 'required')
				.type(user.address)
			cy.get('#np_new_payee_account')
				.as('np_account')
				.should('be.visible')
				.and('have.attr', 'required', 'required')
				.type(user.account.number)
			cy.get('#np_new_payee_details')
				.as('np_details')
				.should('be.visible')
				.type(user.account.name)
		})
		cy.get('#add_new_payee').should('be.visible').click()
	})

	it('should show success message', () => {
		cy.fixture('user').then(user => {
			cy.get('#alert_content')
				.should('be.visible')
				.and(
					'contain',
					'The new payee ' + user.name + ' was successfully created'
				)
		})
	})
})
