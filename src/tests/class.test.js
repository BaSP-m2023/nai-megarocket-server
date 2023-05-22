import request from 'supertest';
import app from '../app';
import Class from '../models/class';
import classSeed from '../seeds/class';

beforeAll(async () => {
  await Class.collection.insertMany(classSeed);
});

describe('GET /api/classes', () => {
  test('Should return status 200 and false error.', async () => {
    const response = await request(app).get('/api/classes').send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
  });
  test('Should return an object containing an array of classes.', async () => {
    const response = await request(app).get('/api/classes').send();
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.data).toEqual(expect.arrayContaining([]));
    expect(response.body.error).toBeFalsy();
  });
  test('List of classes should not be empty.', async () => {
    const response = await request(app).get('/api/classes').send();
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.error).toBeFalsy();
  });
  test('Should return a message indicating "Complete list of classes".', async () => {
    const response = await request(app).get('/api/classes').send();
    expect(response.body.message).toBe('Complete list of classes.');
  });
  test('Should return status 404 and truth error.', async () => {
    const response = await request(app).get('/api/classe').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('Should return all properties of classes.', async () => {
    const response = await request(app).get('/api/classes').send();
    const classes = response.body.data;
    classes.forEach((classItem) => {
      expect(classItem).toHaveProperty('day');
      expect(classItem).toHaveProperty('hour');
      expect(classItem).toHaveProperty('trainer');
      expect(classItem).toHaveProperty('activity');
      expect(classItem).toHaveProperty('slots');
    });
    expect(response.error).toBeFalsy();
  });
});
