import LoginPage from '../../classes/LoginPage.class'
describe('Transfer Funds Verification Test', () => {
	before(() => {
		LoginPage.loginToSite()
	})

	beforeEach(() => {
		// preserves session id across tests so that we don't get logged out.
		Cypress.Cookies.preserveOnce('JSESSIONID')
	})

	after(() => {
		//cy.logout()
	})

	it('should navigate to transfer funds form', () => {})
	it('should complete transfer funds form', () => {})
	it('should validate transfer funds data', () => {})
})
