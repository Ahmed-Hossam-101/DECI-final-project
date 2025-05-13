import express from 'express';
import resizeImage from '../controllers/imageController.js';
import path from 'path';
import { validateQuery } from '../middleware/middleware.js';

const router = express.Router();

router.get('/resize', validateQuery, async (req, res) => {
  const { filename, width, height } = req.query;

  try {
    const imagePath = await resizeImage(
      filename as string,
      parseInt(width as string),
      parseInt(height as string)
    );

    res.sendFile(path.resolve(imagePath));
  } catch (err) {
    console.error('❌ Error processing image:', err);
    res.status(500).send('❌ Failed to process image');
  }
});

export default router;
