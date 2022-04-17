import Session from '../../models/session';
import { NotAuthorizedError } from '../../error/not-authorized-error';
import User from '../../models/user';
import { UserStatus } from '../../constants/constants';
import { AccountBlockedError } from '../../error/account-blocked-error';

export const protectedRoute = async (req, res, next) => {
  const { authorization: jwt_token } = req.headers;
  const session = await Session.getSession(jwt_token);
  if (!session) throw new NotAuthorizedError();
  const existingUser = await User.findById(session.user_id);
  if (existingUser.user_status_id !== UserStatus.ACTIVE)
    throw new AccountBlockedError();
  req.loggedInUser = existingUser;
  next();
};
