import Session from '../../models/session';
import User from '../../models/user';
import { UserStatus, UserType } from '../../constants/constants';
import { NotAuthorizedError } from '../../error/not-authorized-error';
import { AccountBlockedError } from '../../error/account-blocked-error';

export const adminRoute = async (req, res, next) => {
  const { authorization: jwt_token } = req.headers;
  const session = await Session.getSession(jwt_token);
  if (!session) throw new NotAuthorizedError();
  const existingUser = await User.findById(session.user_id);
  if (existingUser.user_status_id !== UserStatus.ACTIVE)
    throw new AccountBlockedError();
  if (existingUser.user_type_id !== UserType.ADMIN)
    throw new NotAuthorizedError();
  req.loggedInUser = existingUser;
  next();
};
