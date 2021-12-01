describe('TP 01 Menu Tests', () => {
  const base = `http://localhost:3000`

  context('1.1', () => {
    const menues = [];

    before(() => {
      cy.request('POST', `${base}/menu/`, { label: "Very Cool Menu" })
      cy.request('POST', `${base}/menu/very-cool-menu`, { label: "Very Cool Submenu" })
    })
  
    after(() => {
      cy.request('DELETE', `${base}/menu/very-cool-menu`)
    })

    it ('Should open the app', () => {
      cy.visit('/');
    })

    it ('Should find the menu item with label "Very Cool Menu"', () => {
      const parent = cy.get('div:contains(Very Cool Menu)')
      parent.should('be.visible');
    })

    it ('Should expand the menu item', () => {
      const parent = cy.get('div:contains(Very Cool Menu)')
      parent.parent().children('button').click();
    })

    it ('Should find the submenu item with label "Very Cool Submenu"', () => {
      cy.get('div:contains(Very Cool Submenu)').should('be.visible');
    })

    it ('Should toggle edit mode', () => {
      cy.get('input[placeholder="New item..."]').should('have.length', 0)
      cy.get('#edit-toggle').click();
      cy.get('input[placeholder="New item..."]').should('have.length', 2)
    })
  })

  context('2.1', () => {
    
  })
})