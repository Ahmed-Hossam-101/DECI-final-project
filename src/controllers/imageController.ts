import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, '../../images/original');
const outputDir = path.join(__dirname, '../../images/resized');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const resizeImage = async (
  filename: string,
  width: number,
  height: number
): Promise<string> => {
  const inputPath = path.join(inputDir, `${filename}.jpg`);
  const outputFilename = `${filename}_${width}x${height}.jpg`;
  const outputPath = path.join(outputDir, outputFilename);

  if (fs.existsSync(outputPath)) {
    return outputPath;
  }

  await sharp(inputPath).resize(width, height).toFile(outputPath);
  return outputPath;
};

export default resizeImage;
