/// <reference types="Cypress" />

export const selectors = {
  sortingListContainer: '.List__ListContainer-dxm77m-0',
  sortingListItem: '.List__ListItem-dxm77m-1',
  searchFilterButton: '.SearchFilter__ButtonContainer-sc-1eqnh1i-2'
}

export const sortProductsBy = (sorting) => {
  cy.get(selectors.sortingListContainer).within($list => {
    cy.get(selectors.sortingListItem).contains(sorting).click({
      force: true
    })
  })
}

export const applyFilter = () => {
  cy.get(selectors.searchFilterButton).should('be.visible').click()
}