/// <reference types="Cypress" />

export const selectors = {
  modal: '.Modal__Content-h21mgf-0',
  closeButton: '.styles_closeButton__20ID4',
}

export const closePopup = () => {
  cy.get(selectors.modal).parent().within($popUp => {
    cy.get(selectors.closeButton).should('be.visible').click()
  })
  cy.get(selectors.modal).should('not.exist')
}