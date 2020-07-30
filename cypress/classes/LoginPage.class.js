import BasePage from './BasePage.class'

class LoginPage extends BasePage {
	static getLoginFormFieldAliases() {
		cy.get('#user_login')
			.should('be.visible')
			.and('be.enabled')
			.as('usernameField')
		cy.get('#user_password')
			.should('be.visible')
			.and('be.enabled')
			.as('passwordField')
		cy.get('#user_remember_me')
			.should('be.visible')
			.and('be.enabled')
			.as('rememberMeField')
		cy.get('input[type="submit"][value="Sign in"]')
			.should('be.visible')
			.and('be.enabled')
			.as('submitButton')
	}
	static loginToSite() {
		LoginPage.visitHomePage()

		cy.get('#signin_button').should('be.visible').click()
		cy.url().should('contain', 'login.html')
		cy.get('h3').should('be.visible').and('contain', 'Log in to ZeroBank')

		// verify the form is visible
		cy.get('form#login_form[action="/signin.html"]').should('be.visible')

		LoginPage.getLoginFormFieldAliases()

		cy.fixture('user').then(user => {
			cy.login(user.username, user.password)
		})
	}
}

export default LoginPage
