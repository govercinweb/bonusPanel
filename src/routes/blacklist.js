import { AppRouter } from './AppRouter';
import { protectedRoute } from '../middlewares/auth/protected-route';
import Blacklist from '../models/blacklist';
import { validateFields } from '../utils/validation';

const blacklistHandler = AppRouter.getInstance('/blacklist');

blacklistHandler.get('/list', protectedRoute, async (req, res) => {
  const blacklistedUsers = await Blacklist.getList();
  res.json(blacklistedUsers);
});

blacklistHandler.post('/create', protectedRoute, async (req, res) => {
  const { username, statusId } = req.body;
  validateFields({ username, statusId });
  await Blacklist.addUser(username, statusId);
  res.json({});
});

blacklistHandler.post('/update/:id', protectedRoute, async (req, res) => {
  const { username, statusId } = req.body;
  const { id } = req.params;
  validateFields({ id, username, statusId });
  await Blacklist.updateUser(id, username, statusId);
  res.json({});
});

blacklistHandler.post('/remove/:id', protectedRoute, async (req, res) => {
  const { id } = req.params;
  validateFields({ id });
  await Blacklist.removeUser(id);
  res.json({});
});

blacklistHandler.get('/:id', protectedRoute, async (req, res) => {
  const { id } = req.params;
  validateFields({ id });
  const blacklistedUser = (await Blacklist.getUserById(id)) || {};
  res.json(blacklistedUser);
});
