/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../app';
import Class from '../models/class';
import classSeed from '../seeds/class';

const mockClass = {
  day: 'Monday',
  hour: '17:00',
  trainer: '646428fc0b6aa64a90624a21',
  activity: '6465095739daaa5e7a21031a',
  slots: 7,
};

const mockInvalidId = '646a353ecdc4cb3be6be10b3';

beforeAll(async () => {
  await Class.collection.insertMany(classSeed);
});

describe('PUT /api/class', () => {
  test('should return status 404 due to existing data in DB', async () => {
    const response = await request(app).put(`/api/class/${classSeed[0]._id}`).send(mockClass);
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('DELETE /api/class', () => {
  test('should return status 404 because ID was not found in BD', async () => {
    const response = (await request(app).delete(`/api/class/${mockInvalidId}`).send());
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});
