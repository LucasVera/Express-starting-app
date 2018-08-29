import errors from '../lib/errors';
import { sendJsonError } from '../services/errorHelper';
import { logger } from '../services/loggerService';
import { getBlogPost, getBlogPostList, createBlogPost, updateBlogPost, deleteBlogPost } from '../services/blogService';

export default {
  async getBlogPost(req, res) {
    console.log('hi');
    try {
      const { id } = req.params;
      if (!id) {
        throw errors.BlogIdIsRequired();
      }
      const blog = await getBlogPost(id);
      res.json({
        success: true,
        data: { blog }
      });
      res.end();
    }
    catch (ex) {
      logger.error(ex);
      sendJsonError(res, ex);
    }
  },

  async getBlogPostList(req, res) {
    try {
      const { userId } = req.params;
      const blogs = await getBlogPostList(userId || null);
      res.json({
        success: true,
        data: { blogs }
      });
      res.end();
    }
    catch (ex) {
      logger.error(ex);
      sendJsonError(res, ex);
    }
  },

  async createBlogPost(req, res) {
    try {
      const { userId, title, text, subtitle, posted, postedDate, views, likes } = req.body;
      const blog = await createBlogPost(userId, title, text, subtitle, posted, postedDate, views, likes);
      res.json({
        success: true,
        data: { blog }
      });
      res.end();
    }
    catch (ex) {
      logger.error(ex);
      sendJsonError(res, ex);
    }
  },

  async updateBlogPost(req, res) {
    try {
      const { title, text, subtitle, posted, postedDate, views, likes } = req.body;
      const { id } = req.params;
      const blog = await updateBlogPost(id, title, text, subtitle, posted, postedDate, views, likes);
      res.json({
        success: true,
        data: { blog }
      });
      res.end();
    }
    catch (ex) {
      logger.error(ex);
      sendJsonError(res, ex);
    }
  },

  async deleteBlogPost(req, res) {
    try {
      const { id } = req.params;
      const ok = await deleteBlogPost(id);
      res.json({
        success: true,
        data: { ok }
      });
      res.end();
    }
    catch (ex) {
      logger.error(ex);
      sendJsonError(res, ex);
    }
  }
}
