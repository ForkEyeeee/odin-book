describe('Like Post', () => {
  it('should like a post.', () => {
    cy.get('#post-likes')
      .invoke('text')
      .then(initialLikeCount => {
        cy.get('#post-like-btn').click();
        cy.get('#post-likes').invoke('text').should('not.eq', initialLikeCount);
      });
  });
});
