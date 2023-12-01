describe('View Posts', () => {
  it('should be able to navigate to discover tab', () => {
    cy.get('#discover-tab').click();
    cy.location().should(loc => {
      expect(loc.pathname).to.equal('/discover');
    });
  });
  it('should be able to view different pages', () => {
    cy.get('#next-btn').click();
    cy.location().should(loc => {
      expect(loc.pathname).to.equal('/discover');
    });
  });
});
