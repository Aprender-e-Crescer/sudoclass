import express from 'express';
import cookieParser from 'cookie-parser';
import { auth } from '../services/firebase';

const authMiddleware = express();

// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
const validateFirebaseIdToken = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (
    (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
    // eslint-disable-next-line no-underscore-dangle
    !(req.cookies && req.cookies.__session)
  ) {
    res.status(401).send({ message: 'Cookie or header invalid' });
    return;
  }

  let idToken;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    // Read the ID Token from the Authorization header.
    [, idToken] = req.headers.authorization.split('Bearer ');
  } else if (req.cookies) {
    // Read the ID Token from cookie.
    // eslint-disable-next-line no-underscore-dangle
    idToken = req.cookies.__session;
  } else {
    // No cookie
    res.status(401).send({ message: 'Session or authorization header not found' });
    return;
  }

  try {
    const decodedIdToken = await auth.verifyIdToken(idToken);
    req.user = decodedIdToken;
    next();
    return;
  } catch (error) {
    res.status(401).send({ message: 'Invalid token' });
  }
};

authMiddleware.use(cookieParser());
authMiddleware.use(validateFirebaseIdToken);

export { authMiddleware };
