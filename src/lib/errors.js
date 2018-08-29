export default {
  CannotFindBlog(blogId) { return `Cannot find blog. blogId: ${blogId}.`; },
  BlogIdMissing() { return 'Id of the blog must be specified to update the Blog Post.'; },
  AuthorTitleAndTextNeededForNewBlog() { return 'Cannot create a blog post without at least an author, a title and a text.'; },

  BlogIdIsRequired() { return 'Id of blog is required.' },
  ErrorUpdatingBlogPost(blogId) { return `An error ocurred updating blog with id ${blogId}.` },

  UserNotFound(email) { return `User ${email} not found.` },
  WrongLoginCredentials(email) { return `Incorrect login credentials. ${email}` },
  EmailAndPassRequiredForNewUser() { return 'Email and password are required to create a new user.' },
  EmailAndPassRequiredForLogin() { return 'Email and password are required to login.' },
  UserIdIsRequired() { return 'Id of user is required.' },
  ErrorUpdatingUser(userId) { return `An error ocurred updating user with id ${userId}` }
};
