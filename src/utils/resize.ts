// src/routes/imageResize.ts
import express, { Request, Response } from 'express';
import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import { log } from 'console';

const router = express.Router();

// إعداد تخزين multer
const storage = multer.memoryStorage(); 
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      cb(new Error('Only JPG images are allowed!'));
    }
  },
});

router.post(
  '/',
  upload.single('image'),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { width, height } = req.body;
      const numericWidth = parseInt(width);
      const numericHeight = parseInt(height);

      if (!req.file) {
        res.status(400).json({ error: 'Image file is required' });
        console.log('Image file is ');
        return;
      }

      if (!numericWidth || !numericHeight) {
        res
          .status(400)
          .json({ error: 'Width and height must be provided as numbers' });
        return;
      }

      const outputPath = path.join(
        __dirname,
        '../../resized',
        `${Date.now()}_resized.jpg`
      );
      await sharp(req.file.buffer)
        .resize(numericWidth, numericHeight)
        .toFormat('jpeg')
        .toFile(outputPath);

      res.status(200).json({
        message: 'Image resized successfully',
        path: outputPath,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

export default router;
