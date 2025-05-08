import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inputDir = path.join(__dirname, '../../images/original');
const outputDir = path.join(__dirname, '../../images/resized');
// تأكد أن مجلد الصور المعالجة موجود
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}
const resizeImage = async (filename, width, height) => {
  const inputPath = path.join(inputDir, `${filename}.jpg`);
  const outputFilename = `${filename}_${width}x${height}.jpg`;
  const outputPath = path.join(outputDir, outputFilename);
  // ✅ تحقق من وجود نسخة معالجة مسبقاً (كاش)
  if (fs.existsSync(outputPath)) {
    console.log('🔁 Using cached image');
    return outputPath;
  }
  // ❌ إذا لم توجد، قم بمعالجة الصورة
  await sharp(inputPath).resize(width, height).toFile(outputPath);
  console.log('✅ Image processed and cached');
  return outputPath;
};
export default resizeImage;
