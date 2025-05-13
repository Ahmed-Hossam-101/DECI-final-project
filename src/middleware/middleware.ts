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
      .send('error,provide filename,and width and height ');
    return;
  }

  const Width = parseInt(width as string);
  const Height = parseInt(height as string);

  if (isNaN(Width) || isNaN(Height)) {
    res.status(400).send('error,provide filename,and width and height ');

    return;
  }

  next();
}
