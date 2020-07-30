describe('Search test', () => {
	before(function () {
		cy.visit('http://zero.webappsecurity.com/index.html')
	})

	it('should type into search and submit by pressing enter', () => {
		cy.get('#searchTerm').type('banking {enter}')
	})

	it('should show search results page', () => {
		cy.get('h2').contains('Search Results')
	})
})
