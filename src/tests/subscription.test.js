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

beforeAll(async () => {
  await Subscription.collection.insertMany(subscriptionSeed);
});

const idInvalid = '6465113fb6';
const idValidNotFound = '6465100fb6b5507c22ad8dcd';
const props = ['classes', 'member', 'date'];

describe('PUT /api/subscriptions', () => {
  test('should return status 400 if subscription already exists', async () => {
    const alreadyExists = {
      classes: subscriptionSeed[1].classes,
      member: subscriptionSeed[1].member,
      date: subscriptionSeed[1].date,
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
