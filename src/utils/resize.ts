import express, { Request, Response } from 'express';
import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
const storage = multer.memoryStorage(); 
const router = express.Router();

const UploadTheImg = multer({
  storage ,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      cb(new Error('You can only upload JPEG images'));
    }
  },
});

router.post('/',
 UploadTheImg.single('image'),
  async (req: Request, res: Response): Promise<void> => {
    try {
      
      const { width, height } = req.body;
      const Height = parseInt(height);
      const Width = parseInt(width);

      
      if (!Width || !Height) {
        res.status(400)
        .json({ error: 'Width and height must be provided as numbers' });
      }

      if (!req.file) {
        res.status(400).json({ error: 'Image file is required' });
        return;
      }

      const outputPath = path.join(
        __dirname,
        '../../resized',
        `${Date.now()}_resizedImg.jpg`
      );
      await sharp(req.file.buffer)
        .resize(Width, Height)
        .toFormat('jpeg')
        .toFile(outputPath);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
);

export default router;
