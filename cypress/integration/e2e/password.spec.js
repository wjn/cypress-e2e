import HomePage from '../../classes/HomePage.class'

describe('Password Test', () => {
	before(function () {
		HomePage.visitHomePage()
	})

	it('should click on the signin button', () => {
		cy.get('#signin_button').should('be.visible').click()
	})

	it('should click on forgot password', () => {
		cy.get('.offset3 > a')
			.should('contain', 'Forgot your password')
			.and('be.visible')
			.click()
	})

	it('should complete email form', () => {
		cy.fixture('user').then(user => {
			cy.get('#user_email').should('be.visible').type(user.email)
		})
	})

	it('should submit the form', () => {
		cy.get('.btn').should('be.visible').and('contain', 'Send Password').click()
	})

	it('should confirm that the email has been sent', () => {
		cy.fixture('user').then(user => {
			cy.get('h3').should('contain', 'Forgotten Password')
			cy.get('.offset3').should('contain', user.email)
		})
	})
})
