import LoginPage from '../../classes/LoginPage.class'

describe('Payment Vefification', () => {
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

	it('should navigate to new payment form', () => {
		cy.get('#pay_bills_tab > a').should('be.visible').click()
		cy.get('.board-header').should(
			'contain',
			'Make payments to your saved payees'
		)
	})
	it('should send new payment to Apple for $149.99 from checking', () => {
		const todaysDate = Cypress.moment().format('YYYY-MM-DD')

		cy.get('#sp_payee').should('be.enabled').and('be.visible').select('Apple')
		cy.get('#sp_account')
			.should('be.enabled')
			.and('be.visible')
			.select('Checking')
		cy.get('#sp_amount').should('be.enabled').and('be.visible').type('149.99')
		cy.get('#sp_date')
			.should('be.enabled')
			.and('be.visible')
			.type(todaysDate + '{enter}')
		cy.get('#sp_description')
			.should('be.enabled')
			.and('be.visible')
			.focus()
			.type('AirPods')
		cy.get('#pay_saved_payees').should('be.visible').and('be.enabled').click()
	})

	it('should confirm successful payment', () => {
		cy.get('#alert_container')
			.should('be.visible')
			.and('contain', 'The payment was successfully submitted.')
	})
})
