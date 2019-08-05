/// <reference types="Cypress" />

export const selectors = {
  topCategoryButton: '.TopCategorySwitchItem__Button-sc-1ov7oio-1',
  staticNavigtionItem: '.NavigationItem__LinkWrapper-sc-1jw04xm-0',
  backButton: '.OffcanvasNavigation__BackButton-b6c7mw-3'
}

export const selectTopCategory = (category) => {
  const activeClass = 'hSSJsP'
  cy.get(selectors.topCategoryButton).contains(category).click().should('have.class', activeClass)
}

export const selectProductCategory = (category) => {
  cy.get(selectors.staticNavigtionItem).contains(category).click()
  cy.url().should('contain', category.toLowerCase())
}

export const clickBackButton = () => {
  cy.get(selectors.backButton).should('be.visible').click()
  cy.url().should('contain', 'https://m.aboutyou.de/category-overview')
}