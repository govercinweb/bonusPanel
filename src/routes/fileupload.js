import { AppRouter } from './AppRouter';
import path from 'path';
import { adminRoute } from '../middlewares/auth/admin-route';
import fs from 'fs/promises';

const fileUploadHandler = AppRouter.getInstance('/files');

fileUploadHandler.post('/:filename', adminRoute, async (req, res) => {
  const file = Object.values(req.files)[0];
  const fileName = req.params.filename;
  const dir = path.join(process.env.PWD, './public/files');
  const fullPath = path.join(dir, fileName);
  try {
    await fs.stat(dir);
  } catch (err) {
    await fs.mkdir(dir);
  }
  await file.mv(fullPath);
  res.json({ path: `/files/${fileName}` });
});
