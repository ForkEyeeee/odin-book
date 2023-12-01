describe('View Posts', () => {
  it('should navigate to messages', () => {
    cy.get('#sidebar-btn').click();
    cy.get('#message-btn').click();
    cy.wait(5000);
    cy.location().should(loc => {
      expect(loc.pathname).to.equal('/messages');
    });
  });
  it('should submit a message', () => {
    cy.get('#chat-input').type('This is my message');
    cy.get('#chat-submit-btn').click();
    cy.contains('div', 'Message sent');
  });
  it('should delete a message', () => {
    cy.get('.sender-card').first().click();
    cy.get('#delete-btn').click();
    cy.contains('div', 'Message deleted.');
  });
  it('should edit a message', () => {
    cy.get('.sender-card').first().click();
    cy.get('#edit-btn').click();
    cy.get('#card-input').clear();
    cy.get('#card-input').type('This is my edited message');
    cy.get('#card-save-btn').click();
    cy.get('.sender-card').first().contains('This is my edited message');
  });
});
