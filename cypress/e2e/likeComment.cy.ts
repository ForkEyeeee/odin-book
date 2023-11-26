describe('Like Comment', () => {
  it('should like a Comment.', () => {
    cy.get('#comment-likes')
      .invoke('text')
      .then(initialLikeCount => {
        cy.get('#comment-like-btn').click();
        cy.get('#comment-likes').invoke('text').should('not.eq', initialLikeCount);
      });
  });
});
