export function validateQuery(req, res, next) {
  const { filename, width, height } = req.query;
  if (!filename || !width || !height) {
    res
      .status(400)
      .send('❌ Missing query parameters: filename, width, height');
    return;
  }
  const parsedWidth = parseInt(width);
  const parsedHeight = parseInt(height);
  if (isNaN(parsedWidth) || isNaN(parsedHeight)) {
    res.status(400).send('❌ Width and height must be valid numbers');
    return;
  }
  next(); // ✅ تابع الطلب بشكل طبيعي
}
