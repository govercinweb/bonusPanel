import { AppRouter } from './AppRouter';
import User from '../models/user';
import { RequestError } from '../error/request-error';
import { signUser } from '../utils/auth';
import Session from '../models/session';
import { protectedRoute } from '../middlewares/auth/protected-route';
import { UserStatus } from '../constants/constants';
import { AccountBlockedError } from '../error/account-blocked-error';

const authRouteHandler = AppRouter.getInstance('/auth');

authRouteHandler.get('/currentuser', protectedRoute, (req, res) => {
  const { password: _, ...currentUser } = req.loggedInUser;
  res.json(currentUser);
});

authRouteHandler.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findByEmailOrName(username);
  if (!existingUser || existingUser.password !== password) {
    throw new RequestError(400, 'Invalid credentials');
  }
  if (existingUser.user_status_id !== UserStatus.ACTIVE)
    throw new AccountBlockedError();

  const { id } = existingUser;
  const jwt_token = signUser({ id, seed: Math.round(Math.random() * 10000) });
  await Session.addSession(jwt_token, id);

  res.json({ jwt_token });
});

authRouteHandler.get('/logout', protectedRoute, async (req, res) => {
  const { authorization: jwt_token } = req.headers;
  await Session.removeSession(jwt_token);
  res.json({});
});
