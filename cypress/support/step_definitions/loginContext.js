import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'

// respect custom credentials via env vars
const OC_USER = process.env.OC_USER || null
const OC_PASS = process.env.OC_PASS || null

Given('the user has browsed to the login page', () => {
  cy.visit('/')
})

When('the user clicks the authenticate button', () => {
  cy.get('[data-msgid="Authenticate"]').click()
})

Then(
  'the user logs in with username {string} and password {string} using the webUI',
  (username, password) => {
    username = OC_USER || username
    password = OC_PASS || password
    cy.fillUsernamePassword(username, password)
  }
)

When('the user authorizes access to phoenix', () => {
  cy.get('[type="submit"]').click()
})

Then('the files table should be displayed', () => {
  cy.get('#files-list').should('be.visible')
})

Then('the files table should not be empty', () => {
  cy.get('div.file-row:nth-of-type(2)').should('be.visible')
})
