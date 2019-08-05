/// <reference types="Cypress" />

export const selectors = {
  basketDeliveryItem: '.DeliveryItemStyled__BasketItemComponent-yme8w3-0',
  removeFromBasketIcon: '.DeliveryItemStyled__Icon-yme8w3-13',
  confirmationDialog: '.ConfirmationDialog__Container-mfkvg1-0',
  primaryButton: '.PrimaryButton-sc-16xczox-0',
  selectQuantity: '.NumberDropDown__DropDownSelect-sc-1nhf2xg-1',
  checkoutButton: '.CheckoutButton__StyledCheckoutButton-sc-10j23sn-1'
}

export const expectNArticlesToBeInBasket = (quantity) => {
  cy.get(selectors.basketDeliveryItem).should('have.length', quantity)
}

export const removeNthArticleFromBasket = (nThIndex) => {
  cy.server()
  cy.route('DELETE', '/api/basket/v9/items/*').as('removeFromBasket')

  cy.get(selectors.removeFromBasketIcon).eq(nThIndex - 1).click()
  cy.get(selectors.confirmationDialog).should('be.visible')
  confirmDialog()
  cy.wait('@removeFromBasket').then(xhr => {
    expect(xhr.status).to.eq(200)
  })
}

const confirmDialog = () => {
  cy.get(selectors.confirmationDialog).within($dialog => {
    cy.get(selectors.primaryButton).should('be.visible').click()
  })
}

export const selectQuantity = (quantity) => {
  cy.get(selectors.selectQuantity).select(quantity)
  cy.get(selectors.selectQuantity).should('have.value', quantity)
}

export const proceedToCheckout = () => {
  cy.get(selectors.checkoutButton).should('be.visible').last().click()
}