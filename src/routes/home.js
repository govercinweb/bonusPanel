import { AppRouter } from './AppRouter';
import { Settings } from '../models/settings';
import fs from 'fs/promises';
import path from 'path';

const homeHandler = AppRouter.getInstance('/home/bonus');

const settingsLoader = (filePath) => async (req, res) => {
  const settings = await Settings.getSettings('sitesettings');
  const { link, title } = JSON.parse(settings);
  let result = await fs.readFile(path.join(process.env.PWD, filePath), {
    encoding: 'utf-8',
  });
  result = result.replace(/<website-logo-link>/g, link);
  result = result.replace(/<website-title>/g, title);
  res.send(result);
};

homeHandler.get('/index.html', settingsLoader('./public/bonus/index.html'));
homeHandler.get(
  '/index_username.html',
  settingsLoader('./public/bonus/index_username.html')
);
