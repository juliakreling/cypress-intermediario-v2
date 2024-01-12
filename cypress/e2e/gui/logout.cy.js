describe('Logout', () => {

    beforeEach(() => {
        cy.login()
        cy.visit('/')
    })

    it('successfuly', () => {
        cy.logout()
        cy.url().should('be.equal', `${Cypress.config('baseUrl')}/users/sign_in`)
    })
})