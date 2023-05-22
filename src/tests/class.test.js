import request from 'supertest';
import app from '../app';
import Class from '../models/class';
import classSeed from '../seeds/class';

beforeAll(async () => {
  await Class.collection.insertMany(classSeed);
});

describe('GET /api/classes', () => {
  test('should return status 200', async () => {
    const response = await request(app).get('/api/classes').send();
    expect(response.status).toBe(200);
  });
});
