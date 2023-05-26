/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../app';
import activity from '../models/activity';
import activitySeed from '../seeds/activity';

const mockActivity = {
  name: 'Boxing',
  description: 'vestibulum aliquet ultrices erat tortor sollicitudin mi non mi integer ac neque duis',
  isActive: false,
};

const mockActivityExistingName = {
  name: `${activitySeed[0].name}`,
  description: 'Any description',
  isActive: false,
};

const mockLessName = {
  name: '',
  description: 'Some text',
  isActive: true,
};

const mockLessDescription = {
  name: 'Name',
  description: '',
  isActive: true,
};

const mockLessIsActive = {
  name: 'Names',
  description: 'some description',
  isActive: '',
};
const mockUpdate = {
  name: 'Martin',
  description: 'descriptionnn',
  isActive: false,
};

beforeEach(async () => {
  await activity.collection.insertMany(activitySeed);
});

afterEach(async () => {
  await activity.collection.deleteMany();
});

describe('GET /api/activities', () => {
  test('The database must return 200 if is not empty of activities', async () => {
    const response = await request(app).get('/api/activities').send();
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body).toBeDefined();
    expect(response.body.message).toMatch('Complete activities list');
  });
  test('The status must be 404, if the url is wrong', async () => {
    const response = await request(app).get('/activities').send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeUndefined();
  });
  test('The database must return 404 if it\'s empty of activities. An said There are no activities', async () => {
    await activity.collection.deleteMany({});
    const response = await request(app).get('/api/activities').send();
    expect(response.body.data).toBe(undefined);
    expect(response.status).toBe(404);
    expect(response.body.message).toMatch(/There are no activities/);
  });
});

describe('GET BY ID /api/activities/:id', () => {
  test('The database must return 200 if the id exist', async () => {
    const response = await request(app).get(`/api/activities/${activitySeed[0]._id}`).send();
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.data).toHaveProperty('_id', 'name', 'description', 'isActive');
    expect(response.body.message).toMatch(`Activity with id: ${activitySeed[0]._id}`);
    expect(response.body.error).toBeFalsy();
  });
  test('The database must return 404 if the id does not exist', async () => {
    const nonExistentId = '64677fdefc13ae39f1753b99';
    const response = await request(app).get(`/api/activities/${nonExistentId}`).send();
    expect(response.status).toBe(404);
    expect(response.body.message).toMatch(/There is no activity with id/);
    expect(response.body.error).toBeTruthy();
  });
  test('The database must return 400 if the id is wrong, and said Invalid activity id', async () => {
    const idNotValid = '12345';
    const response = await request(app).get(`/api/activities/${idNotValid}`).send();
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/Invalid activity id/);
    expect(response.body.error).toBeTruthy();
  });
  test('The status must be 404, if the url is wrong', async () => {
    const response = await request(app).get('/activities/:id').send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeUndefined();
  });
});

describe('POST /api/activities', () => {
  test('The status must be 404, if the url is wrong', async () => {
    const response = await request(app).post('/activities').send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeUndefined();
  });
  test('When create an activities status must be 201, and must have name, description and isActive defined', async () => {
    const response = await request(app).post('/api/activities').send(mockActivity);
    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.data).toHaveProperty('name');
    expect(response.body.data).toHaveProperty('description');
    expect(response.body.data).toHaveProperty('isActive');
    expect(response.body.message).toMatch('New activity added correctly');
    expect(response.body.error).toBeFalsy();
  });
  test('If name is already existing, status must be 409', async () => {
    const response = await request(app).post('/api/activities').send(mockActivityExistingName);
    expect(response.status).toBe(409);
    expect(response.body.message).toMatch('Activity with that name already exists');
    expect(response.body.error).toBeTruthy();
  });
  test('If name is not defined, status must be 400, name is required', async () => {
    const response = await request(app).post('/api/activities').send(mockLessName);
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch('There was an error: "name" is not allowed to be empty');
    expect(response.body.error).toBeTruthy();
  });
  test('If description is not defined, status must be 400, description is required', async () => {
    const response = await request(app).post('/api/activities').send(mockLessDescription);
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch('There was an error: "description" is not allowed to be empty');
    expect(response.body.error).toBeTruthy();
  });
  test('If isActive is not defined, status must be 400, isActive is required', async () => {
    const response = await request(app).post('/api/activities').send(mockLessIsActive);
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch('There was an error: "isActive" must be a boolean');
    expect(response.body.error).toBeTruthy();
  });
});
describe('PUT /api/activities', () => {
  test('should return the 201 status if the activity was successfully updated', async () => {
    const response = await request(app).put(`/api/activities/${activitySeed[0]._id.toString()}`).send(mockUpdate);
    expect(response.status).toBe(201);
    expect(response.body.error).toBeFalsy();
  });
  test('should return 400 status if activity not found', async () => {
    const nonExistentId = '64677fdefc13ae39f1753b99';
    const response = await request(app).put(`/api/activities/${nonExistentId}`).send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
  });
});
describe('DELETE /api/activities', () => {
  test('should return status 200 if activity was deleted', async () => {
    const response = await request(app).delete(`/api/activities/${activitySeed[1]._id.toString()}`);
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
  });
  test('should return 400 status if activity not found', async () => {
    const nonExistentId = '64677fdefc13ae39f1753b99';
    const response = await request(app).del(`/api/activities/${nonExistentId}`).send();

    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
  });
});
