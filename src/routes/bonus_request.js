import { validateFields } from '../utils/validation';
import BonusRequest from '../models/bonus-request';
import { protectedRoute } from '../middlewares/auth/protected-route';
import { AppRouter } from './AppRouter';

const bonusRequestHandler = AppRouter.getInstance('/bonus');

bonusRequestHandler.get('/requests/list', async (req, res) => {
  const { username } = req.query;
  validateFields({ username });
  const bonusRequestList = await BonusRequest.getRequestsByUserName(username);
  res.json(bonusRequestList);
});

bonusRequestHandler.get(
  '/requests/search',
  protectedRoute,
  async (req, res) => {
    const { username } = req.query;
    validateFields({ username });
    const bonusRequestList = await BonusRequest.searchRequestListByUserName(
      username
    );
    res.json(bonusRequestList);
  }
);

bonusRequestHandler.get('/requests', protectedRoute, async (req, res) => {
  const bonusRequestList = await BonusRequest.getWaitingRequestList();
  res.json(bonusRequestList);
});

bonusRequestHandler.get(
  '/requests/approved',
  protectedRoute,
  async (req, res) => {
    const bonusRequestList = await BonusRequest.getApprovedRequestList();
    res.json(bonusRequestList);
  }
);

bonusRequestHandler.get(
  '/requests/rejected',
  protectedRoute,
  async (req, res) => {
    const bonusRequestList = await BonusRequest.getRejectedRequestList();
    res.json(bonusRequestList);
  }
);

bonusRequestHandler.post(
  '/request/update/:requestId',
  protectedRoute,
  async (req, res) => {
    const { note, messageId, statusId, bonusId } = req.body;
    const { requestId } = req.params;
    validateFields({ statusId, bonusId, requestId });
    const { id } = req.loggedInUser;
    await BonusRequest.updateBonusRequest(
      id,
      requestId,
      bonusId,
      note,
      messageId,
      statusId
    );
    res.json({});
  }
);

bonusRequestHandler.post('/request/:id', async (req, res) => {
  const { username } = req.body;
  const { id } = req.params;
  validateFields({ username, id });
  await BonusRequest.addBonusRequest(username, id);
  res.json({});
});

bonusRequestHandler.get('/request/:id', protectedRoute, async (req, res) => {
  const { id } = req.params;
  validateFields({ id });
  const bonusRequest = (await BonusRequest.getBonusRequestById(id)) || {};
  res.json(bonusRequest);
});
