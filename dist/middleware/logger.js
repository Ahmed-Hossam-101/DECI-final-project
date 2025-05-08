import fs from 'fs';
import path from 'path';
const logPath = path.join(process.cwd(), 'log.txt');
export function logImageRequest(req, res, next) {
  const { filename, width, height } = req.query;
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] Resized image: ${filename} to ${width}x${height}\n`;
  fs.appendFile(logPath, logEntry, (err) => {
    if (err) {
      console.error('❌ Error writing to log:', err);
    }
  });
  next(); // ✅ استكمال الطلب
}
