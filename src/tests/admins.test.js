/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../app';
import adminSeed from '../seeds/admins';
import Admin from '../models/admins';

const mockAdmin = {
  firstName: 'Admin',
  lastName: 'Admin',
  dni: 61165476,
  phone: 1234567890,
  email: 'adminPost@admin.com',
  city: 'Admin',
  password: 'Admin1234',
};

const mockAdmin2 = {
  firstName: 'AdminPut',
  lastName: 'AdminPut',
  dni: 20164276,
  phone: 3214567890,
  email: 'adminput@admin.com',
  city: 'AdminPut',
  password: 'Admin1234',
};

const mockAdminEmail = {
  firstName: 'Admin',
  lastName: 'Admin',
  dni: 51165476,
  phone: 1234567890,
  email: 'adminPost@admin.com',
  city: 'Admin',
  password: 'Admin1234',
};
const mockAdminDni = {
  firstName: 'Admin',
  lastName: 'Admin',
  dni: 41165476,
  phone: 1234567890,
  email: 'adminPost2@admin.com',
  city: 'Admin',
  password: 'Admin1234',
};
const mockWrongId = '6468483feee5aba1cd3f748b';

beforeAll(async () => {
  await Admin.collection.insertMany(adminSeed);
});

const idInvalid = '6465113fb6';
const idValidNotFound = '6465113fb6b5507c22ad8dcd';

describe('GET /api/admins', () => {
  test('should return status 200 and length to be 2', async () => {
    const response = await request(app).get('/api/admins').send();
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.data.length).toBe(adminSeed.length);
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBeDefined();
  });
  test('should return status 404, as there are no admins in the DB', async () => {
    await Admin.collection.deleteMany();
    const response = await request(app).get('/api/admins').send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.data.length).toBe(0);
    expect(response.body.message).toBeDefined();
  });
});

describe('GETBYID /api/admins/', () => {
  test('should return status 200', async () => {
    await Admin.collection.insertMany(adminSeed);
    const response = await request(app).get(`/api/admins/${adminSeed[0]._id}`).send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBeDefined();
  });
  test('should return status 404 as the id is not in the DB', async () => {
    const response = await request(app).get(`/api/admins/${mockWrongId}`).send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeUndefined();
  });
  test('should return status 400 as the id is Invalid', async () => {
    const response = await request(app).get('/api/admins/hola soy un id').send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBeDefined();
  });
});

describe('POST /api/admins', () => {
  test('should create an admin return status 201', async () => {
    const response = await request(app).post('/api/admins').send(mockAdmin);
    expect(response.status).toBe(201);
    expect(response.body.error).toBeFalsy();
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toBeDefined();
  });
  test('should create an admin return status 400 due to same email', async () => {
    const response = await request(app).post('/api/admins').send(mockAdminEmail);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBeDefined();
  });
  test('should create an admin return status 400 due to same dni', async () => {
    const response = await request(app).post('/api/admins').send(mockAdminDni);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBeDefined();
  });
  test('should return 400 as no body is send', async () => {
    const response = await request(app).post('/api/admins').send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBeDefined();
  });
});

describe('PUT /api/admins', () => {
  test('should return status 400 dni already exists', async () => {
    const response = await request(app).put(`/api/admins/${adminSeed[0]._id.toString()}`).send({ dni: adminSeed[1].dni });
    expect(response.body.message).toBe('There is another admin with that data.');
    expect(response.body.data).toEqual({ dni: adminSeed[1].dni });
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });
  test('should return status 400 email already exists', async () => {
    const response = await request(app).put(`/api/admins/${adminSeed[0]._id.toString()}`).send({ firstName: adminSeed[1].firstName, email: adminSeed[1].email });
    expect(response.body.message).toBe('There is another admin with that data.');
    expect(response.body.data)
      .toEqual({ firstName: adminSeed[1].firstName, email: adminSeed[1].email });
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });
  test('should return status 400 due to invalid id', async () => {
    const response = await request(app).put(`/api/admins/${idInvalid}`).send(mockAdmin2);
    expect(response.body.message).toBe('The ID is not valid');
    expect(response.body.data).toEqual(idInvalid);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });
  test('should return status 404 admin not found', async () => {
    const response = await request(app).put(`/api/admins/${idValidNotFound}`).send(mockAdmin2);
    expect(response.body.message).toBe(`Admin with the id (${idValidNotFound}) was not found.`);
    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
  });
  test('should return status 400 due to empty body', async () => {
    const response = await request(app).put(`/api/admins/${adminSeed[0]._id.toString()}`).send({});
    adminSeed[0]._id = adminSeed[0]._id.toString();
    expect(response.body.message).toBe('There is nothing to change');
    expect(response.body.data).toEqual(adminSeed[0]);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeFalsy();
  });
  test('should return status 200 admin updated', async () => {
    const response = await request(app).put(`/api/admins/${adminSeed[0]._id.toString()}`).send(mockAdmin2);
    const { _id, updatedAt, ...resObj } = response.body.data;
    expect(response.body.message).toBe('Admin updated');
    expect(resObj).toEqual(mockAdmin2);
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
  });
});

describe('DELETE /api/admins', () => {
  test('should return status 404 id not found', async () => {
    const response = await request(app).delete(`/api/admins/${idValidNotFound}`).send();
    expect(response.body.message).toBe(`Admin with ID (${idValidNotFound}) was not found`);
    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
  });
  test('should return status 400 id is not valid', async () => {
    const response = await request(app).delete(`/api/admins/${idInvalid}`).send();
    expect(response.body.message).toBe('The ID is not valid');
    expect(response.body.data).toEqual(idInvalid);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });
  test('should return status 200 admin deleted', async () => {
    const response = await request(app).delete(`/api/admins/${adminSeed[1]._id.toString()}`).send();
    const { updatedAt, ...deletedObj } = response.body.data;
    adminSeed[1]._id = adminSeed[1]._id.toString();
    expect(response.body.message).toBe('Admin deleted');
    expect(deletedObj).toEqual(adminSeed[1]);
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
  });
});
