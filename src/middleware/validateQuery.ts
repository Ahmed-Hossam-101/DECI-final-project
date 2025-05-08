import { Request, Response, NextFunction } from 'express';

export function validateQuery(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { filename, width, height } = req.query;

  if (!filename || !width || !height) {
    res
      .status(400)
      .send('❌ Missing query parameters: filename, width, height');
    return;
  }

  const parsedWidth = parseInt(width as string);
  const parsedHeight = parseInt(height as string);

  if (isNaN(parsedWidth) || isNaN(parsedHeight)) {
    res.status(400).send('❌ Width and height must be valid numbers');
    return;
  }

  next();
}
