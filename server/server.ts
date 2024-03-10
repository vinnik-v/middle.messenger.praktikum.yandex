import express, { Router, Request, Response } from 'express';
import serverless from 'serverless-http';
import path from 'path';

export function createApp() {
  const app = express();
  const router = Router();
  const dirname = path.resolve();

  app.use(express.static(path.join(dirname, 'dist')));

  router.get('*', (_: Request, res: Response) => {
    res.sendFile(path.join(dirname, 'src', 'index.html'));
  });
  app.use(router);

  return app;
}

export const handler = serverless(createApp());
