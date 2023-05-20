import request from 'supertest';
import app from '../app';
import Subscription from '../models/subscription';
import subscriptionSeed from '../seeds/subscription';

const insertManyData = async () => {
  await Subscription.collection.insertMany(subscriptionSeed);
};

describe('GET /api/subscriptions/', () => {
  test('should return status 404 and an empty array if there is no data', async () => {
    const response = await request(app).get('/api/subscriptions/').send();
    expect(response.status).toBe(404);
    expect(response.body.data).toBe([]);
  });

  test('should return status 200 and an array if there is data', async () => {
    insertManyData();
    const response = await request(app).get('/api/subscriptions/').send();
    expect(response.status).toBe(200);
    expect(response.body.data).not.toBe([]);
  });
});

describe('GET /api/subscriptions/:id', () => {
  test('should return an error an status 400 if the id is not valid', async () => {
    const id = 'a@a@a';
    const response = await request(app).get(`/api/subscriptions/${id}`).send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });

  test('should return status 404 if is not found', async () => {
    const id = '6465666a0c73f4c8d3d7c4b9';
    const response = await request(app).get(`/api/subscriptions/${id}`).send();
    expect(response.status).toBe(404);
  });
});

describe('POST /api/subscriptions/', () => {
  test('should return an error and status 400 if the body is empty', async () => {
    const reqBody = {};
    const response = await request(app).post('/api/subscriptions/').send(reqBody);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });

  test('should return an error and status 400 if there is missing a property', async () => {
    const reqBody = {
      classes: '645e93e1a752d93f86251680',
    };
    const response = await request(app).post('/api/subscriptions').send(reqBody);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });

  test('should return an error and status 400 if the subscription already exists', async () => {
    const mockSub = {
      classes: '645e93e1a752d93f86251680',
      member: '645e92fbbe5d7274768a3126',
      date: new Date(2001, 11, 3),
    };
    const response = await request(app).post('/api/subscriptions').send(mockSub);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });

  test('should return an error if the subscription is not correctly defined', async () => {
    const mockSub = {
      classes: 'classwrong',
      member: 'memberwrong',
      date: '1/1/1000',
    };
    const response = await request(app).post('/api/subscriptions').send(mockSub);
    expect(response.status).toBe(400);
  });

  test('should return status 201 and the subscrption when is created', async () => {
    const mockSub = {
      classes: '645e93e1a752d93f86251690',
      member: '645e92fbbe5d7274768a3110',
      date: new Date(2010, 12, 5),
    };
    const matchStructure = Subscription.collection.findOne();
    const response = await request(app).post('/api/subscriptions').send(mockSub);
    expect(response.status).toBe(201);
    expect(response.body.data).toBeDefined();
    expect(response.body).toMatchObject(matchStructure);
  });
});
