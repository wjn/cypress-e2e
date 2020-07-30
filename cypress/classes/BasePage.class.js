class BasePage {
	static visitHomePage() {
		cy.visit('http://zero.webappsecurity.com/index.html')
	}
}
export default BasePage
