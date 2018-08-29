import models from '../db/models/index';
import { mapBlogPost } from '../modelMappers';
import errors from '../lib/errors';
import moment from 'moment';

export function getBlogPost(id) {
  return models.BlogPosts.findOne({ where: { id }});
}

export function getBlogPostList(userId = null) {
  if (userId) {
    return models.BlogPosts.findAll({ where: { userId }});
  }
  else {
    return models.BlogPosts.findAll();
  }
}

export function createBlogPost(userId, title, text, subtitle = '', posted = false, postedDate = moment.utc(0).format(), views = 0, likes = 0) {
  if ((!userId && userId !== 0) || !title || !text) {
    throw errors.AuthorTitleAndTextNeededForNewBlog();
  }
  return models.BlogPosts.create({
    userId,
    title,
    text,
    subtitle,
    posted,
    postedDate,
    views,
    likes
  });
}

export async function updateBlogPost(blogId, title, text, subtitle, posted, postedDate, views, likes) {
  if (!blogId && blogId !== 0) {
    throw errors.BlogIdMissing();
  }
  const dbBlog = await getBlogPost(blogId);
  if (!dbBlog) {
    throw errors.CannotFindBlog(blogId);
  }

  const ok = await models.BlogPosts.update({
    title: title || dbBlog.title,
    text: text || dbBlog.text,
    subtitle: subtitle || dbBlog.subtitle,
    posted: posted || dbBlog.posted,
    postedDate: postedDate || dbBlog.postedDate,
    views: views || dbBlog.views,
    likes: likes || dbBlog.likes
  },
  {
    where: { id: dbBlog.id }
  });
  if (!ok) {
    throw errors.ErrorUpdatingBlogPost(blogId);
  }
  return await getBlogPost(blogId);
}

export async function deleteBlogPost(blogId) {
  const dbBlog = await getBlogPost(blogId);
  if (!dbBlog) {
    throw errors.CannotFindBlog(blogId);
  }
  return await dbBlog.destroy();
}
