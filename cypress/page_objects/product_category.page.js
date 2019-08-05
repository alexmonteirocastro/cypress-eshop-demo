/// <reference types="Cypress" />

export const selectors = {
  filterButton: '.StreamFilterButton__FilterButton-qfnodg-0',
  displayPrice: '.DisplayPrice__DefaultPrice-sc-1uegvb4-3',
  addToWishListButton: '[data-cy-id="AddToWishlist"]'
}

export const openFilter = () => {
  cy.get(selectors.filterButton).should('be.visible').click()
  cy.url().should('contain', 'showFilterMenu=true')
}

export const assertSortingByHighestPriceIsEnforced = () => {
  cy.get(selectors.displayPrice).each(($price, index) => {
    if (index > 0) {
      const priceOfCurrentItem = Number($price.text().slice(0, -5))
      cy.get(selectors.displayPrice).eq(index - 1).then($previousItem => {
        const priceOfPreviousItem = Number($previousItem.text().slice(0, -5))
        expect(priceOfPreviousItem).to.be.at.least(priceOfCurrentItem)
      })
    }
  })
}

export const addNthProductToWishList = (nThIndex) => {
  cy.server()
  cy.route('POST', '/api/wishlist/v7/items?*').as('addItemToWishList')

  cy.get(selectors.addToWishListButton).eq(nThIndex - 1).click().wait('@addItemToWishList').then(xhr => {
    expect(xhr.status).to.eq(201)
  })
}