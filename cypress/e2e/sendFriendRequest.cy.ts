describe('Send friend request', () => {
  it('should navigate to friends list.', () => {
    cy.get('span[role="profile-button"]').click({ force: true });
    cy.get('[data-index="1"]').click();
    cy.location().should(loc => {
      expect(loc.pathname).to.equal('/friends');
    });
  });
  it('should navigate to add friends list.', () => {
    cy.get('#add-friends-btn').click({ force: true });
    cy.location().should(loc => {
      expect(loc.pathname).to.equal('/addfriend');
    });
    it('should add a friend.', () => {
      cy.get('#add-friend-btn').click({ force: true });
      cy.contains('div', 'Added successfully.');
    });
    it('should navigate back to friendslist.', () => {
      cy.location().should(loc => {
        expect(loc.pathname).to.equal('/friends');
      });
    });
  });
});
