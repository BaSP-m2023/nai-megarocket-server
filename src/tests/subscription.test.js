/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../app';
import Subscription from '../models/subscription';
import subscriptionSeed from '../seeds/subscription';

const mockSubscription = {
  classes: '342cd501084fe3a2310c9859',
  member: '560cd412084fe3a2310c9859',
  date: new Date(2014, 5, 14),
};

const idInvalid = '6465113fb6';
const idValidNotFound = '6465100fb6b5507c22ad8dcd';
const props = ['classes', 'member', 'date'];

const insertManyData = async () => {
  await Subscription.collection.insertMany(subscriptionSeed);
};

describe('GET /api/subscriptions/', () => {
  test('should return status 404 and an empty array if there is no data', async () => {
    const response = await request(app).get('/api/subscriptions/').send();
    expect(response.status).toBe(404);
    expect(response.body.message).toBeDefined();
    expect(response.body.message).toMatch(/(not subscriptions)/gi);
    expect(response.body.data).toStrictEqual([]);
  });
  test('should return status 200 and an array if there is data', async () => {
    insertManyData().then(async () => {
      const response = await request(app).get('/api/subscriptions/').send();
      expect(response.status).toBe(200);
      expect(response.body.message).toBeDefined();
      expect(response.body.data).not.toBe([]);
    });
  });
});

describe('GET /api/subscriptions/:id', () => {
  test('should return an error an status 400 if the id is not valid', async () => {
    const mockId = 'a@a@a';
    const response = await request(app).get(`/api/subscriptions/${mockId}`).send();
    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(response.body.message).toMatch(/(invalid)/gi);
    expect(response.body.error).toBeTruthy();
  });

  test('should return status 404 if is not found', async () => {
    const mockId = '6465666a0c73f4c8d3d7c4b9';
    const response = await request(app).get(`/api/subscriptions/${mockId}`).send();
    expect(response.status).toBe(404);
    expect(response.body.message).toBeDefined();
    expect(response.body.message).toMatch(/(not found)/gi);
    expect(response.body.error).toBeTruthy();
  });

  test('should return status 200 and the subscription if it is found', async () => {
    const mockId = '6465666a0c73f4c8d3d7c4b1';
    const response = await request(app).get(`/api/subscriptions/${mockId}`).send();
    expect(response.status).toBe(200);
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeDefined();
    expect(response.body.error).toBeFalsy();
  });
});

describe('DELETE /api/subscriptions', () => {
  test('should return status 404 id not found', async () => {
    const response = await request(app).delete(`/api/subscriptions/${idValidNotFound}`).send();
    expect(response.body.msg).toBe(`Subscription with id: ${idValidNotFound} was not found`);
    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
  });
  test('should return status 400 id is not valid', async () => {
    const response = await request(app).delete(`/api/subscriptions/${idInvalid}`).send();
    expect(response.body.msg).toBe('Id is invalid');
    expect(response.body.data).toEqual(idInvalid);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });
  test('should return status 200 subscription deleted', async () => {
    const response = await request(app).delete(`/api/subscriptions/${subscriptionSeed[1]._id.toString()}`).send();
    subscriptionSeed[1]._id = subscriptionSeed[1]._id.toString();
    props.forEach((prop) => {
      expect(response.body.data).toHaveProperty(prop);
    });
    expect(response.body.msg).toBe(`Subscription with id ${subscriptionSeed[1]._id.toString()} was deleted`);
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
  });
});

describe('POST /api/subscriptions/', () => {
  test('should return an error and status 400 if the body is empty', async () => {
    const reqBody = {};
    const response = await request(app).post('/api/subscriptions/').send(reqBody);
    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(response.body.message).toMatch(/(empty)/gi);
    expect(response.body.error).toBeTruthy();
  });

  test('should return an error and status 400 if there is missing a property', async () => {
    const reqBody = {
      classes: '645e93e1a752d93f86251680',
    };
    const response = await request(app).post('/api/subscriptions').send(reqBody);
    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(response.body.error).toBeTruthy();
  });

  test('should return an error and status 400 if the subscription already exists', async () => {
    const mockSub = {
      classes: subscriptionSeed[0].classes,
      member: subscriptionSeed[0].member,
      date: subscriptionSeed[0].date,
    };
    const response = await request(app).post('/api/subscriptions').send(mockSub);
    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(response.body.message).toMatch(/(exists)/gi);
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
    expect(response.body.message).toBeDefined();
    expect(response.body.error).toBeTruthy();
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
    expect(response.body.message).toBeDefined();
    expect(response.body.message).toMatch(/(created)/gi);
    expect(response.body).toMatchObject(matchStructure);
  });
});

describe('PUT /api/subscriptions', () => {
  test('should return status 400 if subscription already exists', async () => {
    const alreadyExists = {
      classes: subscriptionSeed[3].classes,
      member: subscriptionSeed[3].member,
      date: subscriptionSeed[3].date,
    };
    const response = await request(app)
      .put(`/api/subscriptions/${subscriptionSeed[0]._id.toString()}`)
      .send(alreadyExists);
    props.forEach((prop) => {
      expect(response.body.data).toHaveProperty(prop);
    });
    expect(response.body.msg).toBe('Subscription data already exists');
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });
  test('should return status 400 if body request is identical to db data', async () => {
    const identical = {
      classes: subscriptionSeed[3].classes.toString(),
      member: subscriptionSeed[3].member.toString(),
    };
    const response = await request(app)
      .put(`/api/subscriptions/${subscriptionSeed[3]._id.toString()}`)
      .send(identical);
    props.forEach((prop) => {
      expect(response.body.data).toHaveProperty(prop);
    });
    expect(response.body.msg).toBe('Data in request body and in db instance are identical');
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });
  test('should return status 400 due to invalid id', async () => {
    const response = await request(app).put(`/api/subscriptions/${idInvalid}`).send(mockSubscription);
    expect(response.body.msg).toBe('Id is invalid');
    expect(response.body.data).toEqual(idInvalid);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });
  test('should return status 404 subscription not found', async () => {
    const response = await request(app).put(`/api/subscriptions/${idValidNotFound}`).send(mockSubscription);
    expect(response.body.msg).toBe(`Subscription with id: ${idValidNotFound} not found`);
    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
  });
  test('should return status 400 due to empty body', async () => {
    const response = await request(app).put(`/api/subscriptions/${subscriptionSeed[0]._id.toString()}`).send({});
    subscriptionSeed[0]._id = subscriptionSeed[0]._id.toString();
    expect(response.body.message).toBe('The request body cannot be empty');
    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });
  test('should return status 200 subscription updated', async () => {
    const response = await request(app).put(`/api/subscriptions/${subscriptionSeed[0]._id.toString()}`).send(mockSubscription);
    props.forEach((prop) => {
      expect(response.body.data).toHaveProperty(prop);
    });
    expect(response.body.msg)
      .toBe(`Subscription with id: ${subscriptionSeed[0]._id.toString()} was updated successfully`);
    expect(response.status).toBe(200);
  });
});
