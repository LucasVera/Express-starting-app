import models from '../db/models/index';
import errors from '../lib/errors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export function compareUserPasswords(userPassword, dbPassword) {
  return bcrypt.compare(userPassword, dbPassword);
}

export async function getAuthToken() {
  try {
    const iv = await crypto.randomBytes(8).toString('hex');
    const cipher = crypto.createCipheriv('aes-256-cbc', process.env.BACKEND_SECRET, iv);
    let encrypted = cipher.update(process.env.JWT_SECRET, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const token = jwt.sign({ secret: encrypted, iv }, process.env.BACKEND_SECRET, { expiresIn: '72h' });
    return token;
  }
  catch (ex) {
    throw ex;
  }
}

export function verifyAuthToken(token) {
  try {
    const { secret, iv } = jwt.verify(token, process.env.BACKEND_SECRET);
    const decipher = crypto.createDecipheriv('aes-256-cbc', process.env.BACKEND_SECRET, iv);
    let decrypted = decipher.update(secret, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted === process.env.JWT_SECRET;
  }
  catch (ex) {
    throw ex;
  }
}

export function getUserByEmail(email) {
  return models.Users.findOne({ where: { email }});
}

export function getUserByEmailNoHooks(email) {
  return models.Users.findOne({ where: { email }, hooks: false});
}

export function getUser(id) {
  return models.Users.findOne({ where: { id }});
}

export function getUserList() {
  return models.Users.findAll();
}

export function createUser(name, email, password) {
  if (!email || !password) {
    throw errors.EmailAndPassRequiredForNewUser();
  }
  return models.Users.create({
    name,
    email,
    password,
    failedLoginAttempts: 0
  });
}

export async function updateUser(userId, name, email, password, failedLoginAttempts) {
  if (!userId) {
    throw errors.UserNotFound();
  }
  const dbUser = await getUser(userId);
  if (!dbUser) {
    throw errors.UserNotFound(userId);
  }

  const ok = await models.Users.update({
    name: name || dbUser.name,
    email: email || dbUser.email,
    password: password || dbUser.password,
    failedLoginAttempts: failedLoginAttempts || dbUser.failedLoginAttempts
  },
  {
    where: { id: dbUser.id }
  });
  if (!ok) {
    throw errors.ErrorUpdatingUser(userId);
  }
  return await getUser(userId);
}

export async function deleteUser(userId) {
  const dbUser = await getUser(userId);
  if (!dbUser) {
    throw errors.UserNotFound(userId);
  }
  return await dbUser.destroy();
}
