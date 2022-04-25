import { AppRouter } from './AppRouter';
import { protectedRoute } from '../middlewares/auth/protected-route';
import Message from '../models/message';
import { validateFields } from '../utils/validation';

const messageHandler = AppRouter.getInstance('/message');

messageHandler.get('/list', protectedRoute, async (req, res) => {
  const list = await Message.getList();
  res.json(list);
});

messageHandler.get('/list/active', async (req, res) => {
  const list = await Message.getActiveList();
  res.json(list);
});

messageHandler.post('/create', protectedRoute, async (req, res) => {
  const { message, statusId } = req.body;
  validateFields({ message, statusId });
  await Message.addMessage(message, statusId);
  res.json({});
});

messageHandler.post('/update/:id', protectedRoute, async (req, res) => {
  const { message, statusId } = req.body;
  const { id } = req.params;
  validateFields({ id, message, statusId });
  await Message.updateMessage(id, message, statusId);
  res.json({});
});

messageHandler.post('/remove/:id', protectedRoute, async (req, res) => {
  const { id } = req.params;
  validateFields({ id });
  await Message.removeMessage(id);
  res.json({});
});

messageHandler.get('/:id', protectedRoute, async (req, res) => {
  const { id } = req.params;
  validateFields({ id });
  const message = (await Message.getMessageById(id)) || {};
  res.json(message);
});
