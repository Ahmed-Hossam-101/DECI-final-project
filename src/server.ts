import express from 'express';
import imageRoutes from './routes/imageRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const port = 3001;

app.use('/api/images', imageRoutes);

app.use(
  '/images/original',
  express.static(path.join(__dirname, '../images/original'))
);
app.use(
  '/images/resized',
  express.static(path.join(__dirname, '../images/resized'))
);
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
