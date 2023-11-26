describe('Create and Delete Comment', () => {
  it('should type and submit a comment.', () => {
    cy.get('#comment-area').type('This is my comment');
    cy.get('#comment-submit-btn').click();
    cy.contains('div', 'Created successfully');
  });

  it('should delete the comment.', () => {
    cy.get('#comment-delete-btn').click();
    cy.contains('div', 'Deleted successfully');
  });
});
