import request from 'supertest';
import app from '../app';
import Admin from '../models/admins';
import adminSeed from '../seeds/admins';

const mockAdmin = {
  firstName: 'admin',
  lastName: 'admin',
  dni: 22105409,
  phone: 1235467855,
  email: 'ignacio@gmail.com',
  city: 'Rosario',
  password: 'Testerfacil123',
};

const idInvalid = '6465113fb6';

beforeAll(async () => {
  await Admin.collection.insertMany(adminSeed);
});

describe('PUT /api/admins', () => {
  test('should return status 400 dni already exists', async () => {
    const response = await request(app).put('/api/admins/6465125fb6b5507c22ad8dcd').send({ dni: 33323343 });
    expect(response.body.message).toBe('There is another admin with that data.');
    expect(typeof response.body.data).toBe('object');
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('should return status 400 email already exists', async () => {
    const response = await request(app).put('/api/admins/6465125fb6b5507c22ad8dcd').send({ firstName: 'admin2', email: 'testing@gmail.com' });
    expect(response.body.message).toBe('There is another admin with that data.');
    expect(typeof response.body.data).toBe('object');
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('should return status 400 due to invalid id', async () => {
    const response = await request(app).put(`/api/admins/${idInvalid}`).send(mockAdmin);
    expect(response.body.message).toBe('The ID is not valid');
    expect(response.body.data).toBe(idInvalid);
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('should return status 404 admin not found', async () => {
    const response = await request(app).put('/api/admins/6264125fb6b5507c22ad8dce').send(mockAdmin);
    expect(response.body.message).toBe('Admin with the id (6264125fb6b5507c22ad8dce) was not found.');
    expect(response.body.data).toBe(undefined);
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('should return status 400 due to empty body', async () => {
    const response = await request(app).put('/api/admins/6465125fb6b5507c22ad8dce').send({});
    expect(response.body.message).toBe('There is nothing to change');
    expect(typeof response.body.data).toBe('object');
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('should return status 200 admin updated', async () => {
    const response = await request(app).put('/api/admins/6465125fb6b5507c22ad8dce').send(mockAdmin);
    expect(response.body.message).toBe('Admin updated');
    expect(typeof response.body.data).toBe('object');
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
});

describe('PUT /api/admins', () => {
  test('should return status 404 id not found', async () => {
    const response = await request(app).delete('/api/admins/6465113fb6b5507c22ad8dcd').send();
    expect(response.body.message).toBe('Admin with ID (6465113fb6b5507c22ad8dcd) was not found');
    expect(response.body.data).toBe(undefined);
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('should return status 400 id is not valid', async () => {
    const response = await request(app).delete(`/api/admins/${idInvalid}`).send();
    expect(response.body.message).toBe('The ID is not valid');
    expect(response.body.data).toBe(idInvalid);
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('should return status 200 admin deleted', async () => {
    const response = await request(app).delete('/api/admins/6465125fb6b5507c22ad8dcd').send();
    expect(response.body.message).toBe('Admin deleted');
    expect(typeof response.body.data).toBe('object');
    expect(response.body.message).toBe('Admin deleted');
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
});
