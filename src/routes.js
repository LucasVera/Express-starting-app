import blogController from './controllers/blogController';
import userController from './controllers/userController';
import { authRequired } from './middleware';

export default app => {
  app.get('/blogpost/:id', authRequired, blogController.getBlogPost);
  app.get('/blogpost', authRequired, blogController.getBlogPostList);
  app.post('/blogpost', authRequired, blogController.createBlogPost);
  app.put('/blogpost/:id', authRequired, blogController.updateBlogPost);
  app.patch('/blogpost/:id', authRequired, blogController.updateBlogPost);
  app.delete('/blogpost/:id', authRequired, blogController.deleteBlogPost);

  app.post('/login', userController.login);

  app.get('/user', authRequired, userController.getUserList);
  app.get('/user/:id', authRequired, userController.getUser);
  app.post('/user', authRequired, userController.createUser);
  app.put('/user/:id', authRequired, userController.updateUser);
  app.patch('/user/:id', authRequired, userController.updateUser);
  app.delete('/user/:id', authRequired, userController.deleteUser);

}
