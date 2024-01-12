import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }

describe('CreateProject', options, () => {
    beforeEach(() => {
        cy.api_deleteProjects()
        cy.login()
        cy.visit('/')
    })

    it('succesfully', () => {
        const project = {
            name: `project-${faker.datatype.uuid()}`
        }

        cy.gui_createProject(project)
        cy.url().should('be.equal', `${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${project.name}`)
    })
})