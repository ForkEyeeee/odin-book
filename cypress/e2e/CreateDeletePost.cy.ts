describe('Create and Delete Post', () => {
  it('should type and submit a post.', () => {
    cy.get('button[role="create-post-button"]').click();
    cy.get('#post').type('This is my post');
    cy.get('#submit-post-btn').click();
    cy.contains('div', 'Created successfully');
  });
  it('should delete post.', () => {
    cy.get('#delete-post-btn').click();
    cy.contains('div', 'Deleted successfully');
  });
});
