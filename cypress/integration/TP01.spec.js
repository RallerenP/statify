describe('TP 01 Menu Tests', () => {
  context('1.1', () => {
    it ('Should open the app', () => {
      cy.visit('/');
    })
    
    it ('Should expand the menu item with label `Very Cool Menu`', () => {
      const parent = cy.get('div:contains(Very Cool Menu)')
      parent.should('be.visible');
      
      parent.parent().children('button').click();

      cy.get('div:contains(Very Cool Submenu)').should('be.visible');
    })

    it ('Should toggle edit mode', () => {
      cy.get('')
    })
  })
  


})