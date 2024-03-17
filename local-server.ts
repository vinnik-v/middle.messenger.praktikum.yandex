import { createApp } from './server/server.ts';

const PORT = 3000;
const app = createApp();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
