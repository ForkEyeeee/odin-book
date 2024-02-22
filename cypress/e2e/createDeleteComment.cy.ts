describe('Create and Delete Comment', () => {
  it('should type and submit a comment.', () => {
    cy.get('#chat-input').type('This is my message');
    cy.get('#comment-submit-btn').click();
    cy.contains('div', 'Created successfully');
  });

  it('should delete the comment.', () => {
    cy.get('#comment-delete-btn').click();
    cy.contains('div', 'Deleted successfully');
  });
});
