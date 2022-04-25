import { AppRouter } from './AppRouter';
import { protectedRoute } from '../middlewares/auth/protected-route';
import Bonus from '../models/bonus';
import { validateFields } from '../utils/validation';
import { adminRoute } from '../middlewares/auth/admin-route';

const bonusHandler = AppRouter.getInstance('/bonus');

bonusHandler.get('/list', protectedRoute, async (req, res) => {
  const bonusList = await Bonus.getList();
  res.json(bonusList);
});

bonusHandler.get('/list/active', async (req, res) => {
  const activeBonusList = await Bonus.getActiveList();
  res.json(activeBonusList);
});

bonusHandler.post('/create', adminRoute, async (req, res) => {
  const { text, content, statusId } = req.body;
  validateFields({ text, statusId });
  await Bonus.addBonus(text, content, statusId);
  res.json({});
});

bonusHandler.post('/update/:id', adminRoute, async (req, res) => {
  const { text, content, statusId } = req.body;
  const { id } = req.params;
  validateFields({ text, statusId, id });
  await Bonus.updateBonus(id, text, content, statusId);
  res.json({});
});

bonusHandler.get('/:id', protectedRoute, async (req, res) => {
  const { id } = req.params;
  const bonus = (await Bonus.getBonusById(id)) || {};
  res.json(bonus);
});
