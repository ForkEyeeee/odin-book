import { Post } from '@/app/components/Post';
/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

// Cypress Component Test
describe('<Post />', () => {
  it('should render and display expected content', () => {
    // Mount the React component for the About page
    const sampleData = {
      id: 1,
      content: 'This is an example post content for mocking the Post component.',
      imageUrl: 'https://via.placeholder.com/500',
      authorId: 1,
      createdAt: new Date('2023-04-05T12:34:56Z'),
      author: {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        profilePicture: 'https://via.placeholder.com/150',
        googleId: 'mockGoogleId123',
        hashedPassword: 'mockHashedPassword123',
        profileId: 123,
      },
    };

    const index = 0;

    // Then you can mount your component with this mock data
    cy.mount(<Post post={sampleData} index={index} />);

    // The new page should contain an p with "John Doe"
    cy.get('p').contains('John Doe');
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
