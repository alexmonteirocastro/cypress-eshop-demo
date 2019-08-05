/// <reference types="Cypress" />

import * as homePage from '../page_objects/homepage.page'
import * as header from '../page_objects/header.component'
import * as categoryOverview from '../page_objects/category_overview.page'
import * as productCategory from '../page_objects/product_category.page'
import * as filter from '../page_objects/filter.page'
import * as wishlist from '../page_objects/wishlist.page'
import * as basket from '../page_objects/basket.page'

context('AboutYou e-shop', () => {
  before(() => {
    cy.visit('/')
    homePage.closePopup()
  });

  it('should open the menu', () => {
    header.openMenu()
  });

  it('should go to sale category and return', () => {
    categoryOverview.selectTopCategory('Frauen')
    categoryOverview.selectProductCategory('SALE')
    categoryOverview.clickBackButton()
  });

  it('should go to women shoes category and selects the sneakers sub-category', () => {
    categoryOverview.selectProductCategory('Schuhe')
    categoryOverview.selectProductCategory('Sneaker')
  });

  it('sorts shoes from highest price', () => {
    cy.server()
    cy.route('https://api-cloud.aboutyou.de/v1/products?*').as('getProducts')

    productCategory.openFilter()
    filter.sortProductsBy('Höchster Preis')
    filter.applyFilter()
    cy.url().should('contain', 'sortOrder=price_high')
    cy.wait('@getProducts')
    productCategory.assertSortingByHighestPriceIsEnforced()
  });

  it('adds the two first products of the list to the wish list', () => {
    productCategory.addNthProductToWishList(1)
    header.expectNumberOfItemsInWishList('1')
    productCategory.addNthProductToWishList(2)
    header.expectNumberOfItemsInWishList('2')
  });

  it('goes to the  wishlist and adds the two articles to the basket', () => {
    header.goToWishList()
    wishlist.numberOfProductsInWishlistShoulBe(2)
    wishlist.addNthWishlistItemToCart(1)
    wishlist.selectSize('36')
    header.expectNumberOfItemsInCart('1')
    wishlist.addNthWishlistItemToCart(2)
    wishlist.selectSize('37')
    header.expectNumberOfItemsInCart('2')
  });

  it('goes to basket and removes the first item', () => {
    header.goToBasket()
    basket.expectNArticlesToBeInBasket(2)
    basket.removeNthArticleFromBasket(1)
    basket.expectNArticlesToBeInBasket(1)
  });

  it('changes  order quantity to 2 items and proceeds to checkout', () => {
    basket.selectQuantity('2')
    basket.proceedToCheckout()
  });
});