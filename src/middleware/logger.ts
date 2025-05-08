import fs from 'fs';
import path from 'path';
import { Request, Response, NextFunction } from 'express';

const logPath = path.join(process.cwd(), 'log.txt');

export function logImageRequest(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { filename, width, height } = req.query;
  const timestamp = new Date().toISOString();

  const logEntry = `[${timestamp}] Resized image: ${filename} to ${width}x${height}\n`;

  fs.appendFile(logPath, logEntry, (err) => {
    if (err) {
      console.error('❌ Error writing to log:', err);
    }
  });

  next(); 
}
