import LoginPage from '../../classes/LoginPage.class'
describe('Currency Exchange Test', () => {
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

	it('should navigate to conversion form', () => {
		cy.get('#pay_bills_tab > a').should('be.visible').click()
		cy.get('.board-header').should(
			'contain',
			'Make payments to your saved payees'
		)
		cy.get('.ui-tabs-nav > :nth-child(3) > a')
			.should('contain', 'Purchase Foreign Currency')
			.and('be.visible')
			.click()
		cy.get('.board-header').should('contain', 'Purchase foreign currency cash')
	})
	it('should complete conversion form', () => {
		cy.get('#pc_currency')
			.should('be.visible')
			.and('be.enabled')
			.select('DKK')
			.should('have.value', 'DKK')
		cy.get('#pc_amount').should('be.visible').and('be.enabled').type('10000')
		cy.get('#pc_inDollars_true')
			.should('be.visible')
			.and('be.enabled')
			.check('true')
		cy.get('#pc_calculate_costs').should('be.visible').and('be.enabled').click()
	})
	it('should display conversion amount', () => {
		cy.get('#pc_conversion_amount')
			.should('be.visible')
			.and('contain', '53676.87 krone (DKK) = 10000.00 U.S. dollar (USD)')
	})
})
