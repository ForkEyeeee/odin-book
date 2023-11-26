describe('Update Profile', () => {
  it('should navigate to profile page', () => {
    cy.get('span[role="profile-button"]').click({ force: true });
    cy.get('[data-index="0"]').click();
    cy.location().should(loc => {
      expect(loc.pathname).to.equal('/profile');
    });
  });
  it('should update and save profile', () => {
    cy.get('#email-alerts').click({ force: true });
    cy.get('#bio').clear();
    cy.get('#bio').type('I am a guest user');
    cy.get('#profile-submit-btn').click();
    cy.contains('div', 'Updated successfully.');
  });
});
