import express, { Request, Response } from 'express';
import path from 'path';
const __dirname = path.resolve();
const PORT = 3000

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (_: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});