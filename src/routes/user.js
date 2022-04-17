import { adminRoute } from '../middlewares/auth/admin-route';
import User from '../models/user';
import { AppRouter } from './AppRouter';
import { validateFields } from '../utils/validation';
import { protectedRoute } from '../middlewares/auth/protected-route';
import Bonus from '../models/bonus';

const userRouteHandler = AppRouter.getInstance('/users');

userRouteHandler.get('/list', adminRoute, async (req, res) => {
  const userList = await User.getUserList();
  res.json(userList);
});

userRouteHandler.post('/create', adminRoute, async (req, res) => {
  const {
    loginName,
    password,
    username,
    email,
    phone,
    userType,
    userStatus,
    permissions,
  } = req.body;
  validateFields({
    loginName,
    password,
    username,
    userType,
    userStatus,
    permissions,
  });
  await User.createUser(
    loginName,
    password,
    username,
    email,
    phone,
    userType,
    userStatus,
    permissions
  );
  res.json({});
});

userRouteHandler.post('/update', protectedRoute, async (req, res) => {
  const { loginName, password, username, userSurname, email, phone } = req.body;
  validateFields({ loginName, password, username, userSurname });
  const { id } = req.loggedInUser;
  await User.updateUserProfile(
    id,
    loginName,
    password,
    username,
    userSurname,
    email,
    phone
  );
  res.json({});
});

userRouteHandler.post('/update/:id', adminRoute, async (req, res) => {
  const {
    loginName,
    password,
    username,
    email,
    phone,
    userType,
    userStatus,
    permissions,
  } = req.body;
  const { id } = req.params;
  validateFields({
    id,
    loginName,
    password,
    username,
    userType,
    userStatus,
    permissions,
  });
  await User.updateUser(
    id,
    loginName,
    password,
    username,
    email,
    phone,
    userType,
    userStatus,
    permissions
  );
  res.json({});
});

userRouteHandler.post('/remove/:id', adminRoute, async (req, res) => {
  const { id } = req.params;
  validateFields({ id });
  await User.removeUser(id);
  res.json({});
});

userRouteHandler.get('/:id', adminRoute, async (req, res) => {
  const { id } = req.params;
  validateFields({ id });
  const user = (await User.findById(id)) || {};
  const bonus_permissions = await Bonus.getBonusPermissionsByUserId(id);
  const bonus_list = await Bonus.getList();
  res.json({ ...user, bonus_permissions, bonus_list });
});
