/// <reference types="Cypress" />

export const selectors = {
  productTile: '.ProductTile__Tile-sc-3vndnt-1',
  addToCartIcon: '.BasketIconWithPlus__Container-sc-1fxsw6a-0',
  sizeItem: '.SizeActionSheetItem__ListItem-sc-4hag4o-0'
}

export const numberOfProductsInWishlistShoulBe = (number) => {
  cy.get(selectors.productTile).should('have.length', number)
}

export const addNthWishlistItemToCart = (nthIndex) => {
  cy.get(selectors.addToCartIcon).eq(nthIndex - 1).click()
}

export const selectSize = (size) => {
  cy.server()
  cy.route('POST', '/api/basket/v9/items?*').as('addToBasket')

  cy.get(selectors.sizeItem).contains(size).click().wait('@addToBasket').then(xhr => {
    expect(xhr.status).to.eq(200)
  })
}