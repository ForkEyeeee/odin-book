describe('Sign In and Create Post Test', () => {
  it('should sign in as a guest and then click the create post button', () => {
    cy.visit('http://localhost:3000/');

    cy.contains('button', 'Sign in with Guest').click();

    cy.get('button[role="create-post-button"]').click();
    cy.get('#post').type('This is my post');
    cy.get('#submit-post-btn').click();

    cy.wait(2000);

    cy.contains('div', 'Created successfully');

    cy.wait(2000);

    cy.get('#delete-post-btn').click();

    cy.contains('div', 'Deleted successfully');

    cy.get('#comment-area').type('This is my comment');

    cy.wait(2000);

    cy.get('#comment-submit-btn').click();

    cy.contains('div', 'Created successfully');

    cy.wait(2000);

    cy.get('#comment-delete-btn').click();

    cy.get('#post-likes')
      .invoke('text')
      .then(initialLikeCount => {
        cy.get('#post-like-btn').click();

        cy.wait(3000);

        cy.get('#post-likes').invoke('text').should('not.eq', initialLikeCount);
      });

    cy.wait(3000);

    cy.get('#comment-likes')
      .invoke('text')
      .then(initialLikeCount => {
        cy.get('#comment-like-btn').click();

        cy.wait(3000);

        cy.get('#comment-likes').invoke('text').should('not.eq', initialLikeCount);
      });
  });
});
