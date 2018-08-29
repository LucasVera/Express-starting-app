import errors from '../lib/errors';
import { sendJsonError } from '../services/errorHelper';
import { getUserList, getUser, updateUser, createUser,
  deleteUser, compareUserPasswords, getAuthToken, getUserByEmailNoHooks } from '../services/userService';
import { logger } from '../services/loggerService';

export default {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw errors.EmailAndPassRequiredForLogin();
      }
      const user = await getUserByEmailNoHooks(email);
      if (!user) {
        throw errors.UserNotFound(email);
      }
      const isMatch = await compareUserPasswords(password, user.password);
      if (!isMatch) {
        throw errors.WrongLoginCredentials(email);
      }
      const token = await getAuthToken();
      res.json({
        success: true,
        data: { token }
      });
      res.end();
    }
    catch (ex) {
      logger.error(ex);
      sendJsonError(res, ex);
    }
  },

  async getUserList(req, res) {
    try {
      const users = await getUserList();
      res.json({
        success: true,
        data: { users }
      });
      res.end();
    }
    catch (ex) {
      logger.error(ex);
      sendJsonError(res, ex);
    }
  },

  async getUser(req, res) {
    try {
      const { id } = req.params;
      const user = await getUser(id);
      res.json({
        success: true,
        data: { user }
      });
      res.end();
    }
    catch (ex) {
      logger.error(ex);
      sendJsonError(res, ex);
    }
  },

  async createUser(req, res) {
    try {
      const { name, email, password } = req.body;
      const user = await createUser(name, email, password);
      res.json({
        success: true,
        data: { user }
      });
      res.end();
    }
    catch (ex) {
      logger.error(ex);
      sendJsonError(res, ex);
    }
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password, failedLoginAttempts } = req.body;
      const user = await updateUser(id, name, email, password, failedLoginAttempts);
      res.json({
        success: true,
        data: { user }
      });
      res.end();
    }
    catch (ex) {
      logger.error(ex);
      sendJsonError(res, ex);
    }
  },

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const ok = await deleteUser(id);
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
