Cypress.Commands.add('login', (
  user = Cypress.env('user_name'),
  password = Cypress.env('user_password'),
  { cacheSession = true } = {},
) => {
  const login = () => {
    cy.visit('/users/sign_in')
    cy.get("[data-qa-selector='login_field']").type(user)
    cy.get("[data-qa-selector='password_field']").type(password, { log: false })
    cy.get("[data-qa-selector='sign_in_button']").click()
  }

  const validate = () => {
    cy.visit('/')
    cy.location('pathname', { timeout: 1000 })
      .should('not.eq', '/users/sign_in')
  }

  const options = {
    cacheAcrossSpecs: true,
    validate
  }

  if (cacheSession) {
    cy.session(user, login, options)
  } else {
    login()
  }
})

Cypress.Commands.add('logout', () => {
  cy.get('.top-bar-container > .btn').click()
  cy.get('[data-testid="user_avatar_content"]').click()
  cy.contains('Sign out').click()
})

Cypress.Commands.add('gui_createProject', project => {
  cy.visit('/projects/new')
  cy.contains('Create blank project').click()
  cy.get('#project_name').type(project.name)
  cy.contains('Pick a group or namespace').click()
  cy.wait(500)
  cy.get('.dropdown-item').click()
  cy.get('#new_project > [data-testid="project-create-button"]').click()
})

Cypress.Commands.add('gui_createIssue', issue => {
  cy.visit(`/${Cypress.env('user_name')}/${issue.project.name}/issues/new`)
  cy.get('[data-testid="issuable-form-title-field"]').type(issue.title)
  cy.get('[data-testid="issuable-form-description-field"]').type(issue.description)
  cy.get('[data-testid="issuable-create-button"]').click()
})

Cypress.Commands.add('gui_setLabelOnIssue', label => {
  cy.get('.qa-edit-link-labels').click()
  cy.contains(label.name).click()
  cy.get('body').click()
})

Cypress.Commands.add('gui_setMilestoneOnIssue', milestone => {
  cy.get('.block.milestone .edit-link').click()
  cy.contains(milestone.title).click()
})