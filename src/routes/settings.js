import { AppRouter } from './AppRouter';
import { adminRoute } from '../middlewares/auth/admin-route';
import { Settings } from '../models/settings';

const settingsHandler = AppRouter.getInstance('/settings');

settingsHandler.get('/:key', async (req, res) => {
  const { key } = req.params;
  const value = await Settings.getSettings(key);
  res.json({ [key]: value });
});

settingsHandler.post('/:key', adminRoute, async (req, res) => {
  const { key } = req.params;
  const { value } = req.body;
  await Settings.setSettings(key, value);
  res.json({});
});
