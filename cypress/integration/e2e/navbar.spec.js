import HomePage from '../../classes/HomePage.class'
describe('Verify Main Navigation', () => {
	before(function () {
		HomePage.visitHomePage()
	})
	it('should have all three navigation links', () => {
		cy.get('#pages-nav').as('nav').should('be.visible')
		cy.get('#pages-nav li').should('have.length', 3)
	})
	it('should display online banking content', () => {
		cy.get('#onlineBankingMenu').should('be.visible').click()
		cy.url().should('include', 'online-banking.html')
		cy.get('h1').should('be.visible').and('contain', 'Online Banking')
	})
	it('should display feedback content', () => {
		cy.get('#feedback').should('be.visible').click()
		cy.url().should('include', 'feedback.html')
		cy.get('h3').should('be.visible').and('contain', 'Feedback')
	})
	it('should display homepage content', () => {
		cy.get('.brand').should('be.visible').click()
		cy.url().should('include', 'index.html')
	})
})
