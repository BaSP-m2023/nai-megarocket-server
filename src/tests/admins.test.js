/* eslint-disable no-underscore-dangle */
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

beforeAll(async () => {
  await Admin.collection.insertMany(adminSeed);
});

const idInvalid = '6465113fb6';
const idValidNotFound = '6465113fb6b5507c22ad8dcd';

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
    const response = await request(app).put(`/api/admins/${idInvalid}`).send(mockAdmin);
    expect(response.body.message).toBe('The ID is not valid');
    expect(response.body.data).toEqual(idInvalid);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });
  test('should return status 404 admin not found', async () => {
    const response = await request(app).put(`/api/admins/${idValidNotFound}`).send(mockAdmin);
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
    const response = await request(app).put(`/api/admins/${adminSeed[0]._id.toString()}`).send(mockAdmin);
    const { _id, updatedAt, ...resObj } = response.body.data;
    expect(response.body.message).toBe('Admin updated');
    expect(resObj).toEqual(mockAdmin);
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
