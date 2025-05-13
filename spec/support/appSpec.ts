import request from 'supertest';
import express from 'express';
import imageRoutes from '../../src/routes/imageRoutes';
import fs from 'fs';
import path from 'path';

const app = express();
app.use('/api/images', imageRoutes);

describe('Test the Project', () => {
  it('should return 400 if parameters are missing', async () => {
    const res = await request(app).get('/api/images/resize');
    expect(res.status).toBe(400);
  });

  it('should return 400 if width/height are not numbers', async () => {
    const res = await request(app).get(
      '/api/images/resize?filename=test&width=abc&height=xyz'
    );
    expect(res.status).toBe(400);
  });

  it('return 200 for valid query', async () => {
    const originalPath = path.join(__dirname, '../images/original/test.jpg');
    if (!fs.existsSync(originalPath)) {
      fs.copyFileSync(path.join(__dirname, 'testAsset.jpg'), originalPath); 
    }

    const res = await request(app).get(
      '/api/images/resize?filename=test&width=200&height=200'
    );
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/image\/jpeg/);
  });

  it('image  available', async () => {
    const res = await request(app).get(
      '/api/images/resize?filename=test&width=200&height=200'
    );
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/image\/jpeg/);
  });
});
