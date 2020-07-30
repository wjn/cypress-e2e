import HomePage from '../../classes/HomePage.class'
describe('feedback form test', () => {
	before(function () {
		HomePage.visitHomePage()
		cy.get('#feedback').should('be.visible').click()
	})

	it('should load feedback form', () => {
		cy.url().should('include', 'feedback.html')
		cy.get('h3').should('be.visible').and('contain', 'Feedback')
		cy.get('form[action="/sendFeedback.html"]').should('be.visible')
	})
	it('should complete feedback form', () => {
		cy.fixture('user').then(user => {
			cy.get('#name').should('be.visible').type(user.name)
			cy.get('#email').should('be.visible').type(user.email)
			cy.get('#subject').should('be.visible').type('feedback subject')
			cy.get('#comment')
				.should('be.visible')
				.type(
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
					{ delay: 0 }
				)
		})
	})
	it('should clear feedback form', () => {
		cy.get('[type="reset"]').should('be.visible').click()
		cy.fixture('user').then(user => {
			cy.get('#name').should('have.value', '')
			cy.get('#email').should('have.value', '')
			cy.get('#subject').should('have.value', '')
			cy.get('#comment').should('have.value', '')
		})
	})
	it('should submit feedback form', () => {
		cy.fixture('user').then(user => {
			cy.get('#name').should('be.visible').type(user.name)
			cy.get('#email').should('be.visible').type(user.email)
			cy.get('#subject').should('be.visible').type('feedback subject')
			cy.get('#comment')
				.should('be.visible')
				.type(
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
					{ delay: 0 }
				)
		})
		cy.get('.btn-signin').should('be.visible').click()
	})
	it('should display successful submission message', () => {
		cy.url().should('contain', 'sendFeedback.html')
		cy.get('#feedback-title').should('be.visible').and('contain', 'Feedback')
		cy.fixture('user').then(user => {
			cy.get('.offset3.span6')
				.should('be.visible')
				.and('contain', 'Thank you for your comments, ' + user.name + '.')
		})
	})
})
