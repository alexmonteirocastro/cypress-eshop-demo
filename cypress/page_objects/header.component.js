/// <reference types="Cypress" />

export const selectors = {
  hamburgerMenuButton: '[data-cy-id="BurgerIcon"]',
  headerSearchIcon: '[data-cy-id="HeaderSearchIcon"]',
  headerWishListIcon: '[data-cy-id="HeaderWishlistIcon"]',
  headerBasketIcon: '[data-cy-id="HeaderBasketIcon"]',
  countBadge: '.Badge-sc-1uqjbqf-0'
}

export const openMenu = () => {
  cy.get(selectors.hamburgerMenuButton).click()
  cy.url().should('contain', 'category-overview')
}

export const expectNumberOfItemsInWishList = (quantity) => {
  cy.get(selectors.headerWishListIcon).within($wishList => {
    cy.get(selectors.countBadge).invoke('text').should('equal', quantity)
  })
}

export const goToWishList = () => {
  cy.get(selectors.headerWishListIcon).click()
  cy.url().should('contain', 'wunschliste')
}

export const expectNumberOfItemsInCart = (quantity) => {
  cy.get(selectors.headerBasketIcon).within($cart => {
    cy.get(selectors.countBadge).invoke('text').should('equal', quantity)
  })
}

export const goToBasket = () => {
  cy.get(selectors.headerBasketIcon).click()
  cy.url().should('contain', 'warenkorb')
}