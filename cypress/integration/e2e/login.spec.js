import LoginPage from '../../classes/LoginPage.class'
describe('Login / Logout Test', () => {
	before(function () {
		LoginPage.visitHomePage()
		cy.get('#signin_button').should('be.visible').click()
		cy.url().should('contain', 'login.html')
		cy.get('h3').should('be.visible').and('contain', 'Log in to ZeroBank')

		// verify the form is visible
		cy.get('form#login_form[action="/signin.html"]').should('be.visible')
	})

	it('should attempt login with invalid credentials', () => {
		cy.login('wrong Username', 'invalidpassword')
	})
	it('should display error message', () => {
		cy.url().should('contain', 'login.html?login_error=true')
		cy.get('.alert').should('contain', 'Login and/or password are wrong.')
	})
	it('should attempt login with valid credentials', () => {
		LoginPage.getLoginFormFieldAliases()

		cy.fixture('user').then(user => {
			cy.login(user.username, user.password)
		})
	})
	it('should verify successful authentication', () => {
		cy.url().should('contain', '/bank/account-summary.html')
	})
	it('should attempt to logout from application', () => {
		cy.get('#settingsBox ul li:nth-child(3) > .dropdown-toggle')
			.should('be.visible')
			.click()
		cy.get('#logout_link').should('be.visible').click()
	})
	it('should verify successful logout', () => {
		cy.url().should('contain', '/index.html')
		cy.get('#signin_button').should('be.visible')
	})
})
