/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../app';
import Class from '../models/class';
import classSeed from '../seeds/class';

const mockClass = {
  day: classSeed[1].day,
  hour: classSeed[1].hour,
  trainer: classSeed[1].trainer,
  activity: classSeed[1].activity,
  slots: classSeed[1].slots,
};

const secondMockClass = {
  day: 'Wednesdayyy',
  hour: '17:24',
  trainer: '646428fc0b6aa64a90624c73',
  activity: '6465095739daaa5e7a21023a',
  slots: 3,
};

const mockIdNotFound = '646a353ecdc4cb3be6be10b3';

const invalidId = 'asdasdasd';

beforeAll(async () => {
  await Class.collection.insertMany(classSeed);
});

describe('PUT /api/classes', () => {
  // test('should return status 400 due to existing data in DB', async () => {
  //   const response = await request(app).put(`/api/classes/${classSeed[1]._id}`).send(mockClass);
  //   expect(response.status).toBe(400);
  //   expect(response.body.message).toBe('Class data already exists');
  //   expect(response.body.error).toBeTruthy();
  // });
  test('should return status 404 because ID was not found in BD', async () => {
    const response = await request(app).put(`/api/classes/${mockIdNotFound}`).send(secondMockClass);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe(`ID: ${mockIdNotFound} not found`);
    expect(response.body.error).toBeTruthy();
  });
  test('should return status 400 because of invalid ID', async () => {
    const response = await request(app).put(`/api/classes/${invalidId}`).send(mockClass);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('The ID is not valid');
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeDefined();
  });
  test('should update class correctly', async () => {
    const response = await request(app).put(`/api/classes/${classSeed[0]._id}`).send(secondMockClass);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Class updated correctly');
    expect(response.body.error).toBeFalsy();
  });
});

describe('DELETE /api/classes', () => {
  test('should return status 404 because ID was not found in BD', async () => {
    const response = await request(app).delete(`/api/classes/${mockIdNotFound}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe(`Class with ID (${mockIdNotFound}) was not found`);
    expect(response.body.error).toBeTruthy();
  });
  test('should return status 400 because of invalid ID', async () => {
    const response = await request(app).delete(`/api/classes/${invalidId}`);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('The ID is not valid');
    expect(response.body.error).toBeTruthy();
    expect(response.body.data).toBeDefined();
  });
  test('should delete class', async () => {
    const response = await request(app).delete(`/api/classes/${classSeed[0]._id}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Class deleted');
    expect(response.body.error).toBeFalsy();
  });
});
