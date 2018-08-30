import { verifyAuthToken } from './services/userService';
import { logger } from './services/loggerService';

const unauthorized = (res, msg) => {
  res.status(401);
  if (msg) {
    res.send(msg);
  }
  res.end();
}

export function authRequired(req, res, next) {
  try {
    const { authorization } = req.headers;    
    if (!authorization) {
      unauthorized(res, 'Not allowed');
      return;
    }
    const ok = verifyAuthToken(authorization);
    if (!ok) {
      unauthorized(res, 'Not allowed');
      return;
    }
    next();
  }
  catch (ex) {
    const { name, message } = ex;
    if (name && message) {
      unauthorized(res, message);
      return;
    }
    let error = ex;
    if (typeof ex !== 'string') {
      error = JSON.stringify(ex, Object.getOwnPropertyNames(ex));
    }
    logger.error(error);
    res.status(500).send('An error ocurred verifying authorization header');
    res.end();
  }
}

export default app => {
  // app-level middleware
}
