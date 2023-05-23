/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../app';
import superAdmins from '../models/super-admins';
import superAdminSeed from '../seeds/super-admins';

beforeEach(async () => {
  await superAdmins.collection.insertMany(superAdminSeed);
});

const mockSuperAdmin = {
  firstName: 'Micaela',
  email: 'micaela@prueba.com',
  password: 'Pr0band*',
};

const mockSuperAdminLessName = {
  firstName: '',
  email: 'test@test.com',
  password: 'Pr0band&',
};

const mockSuperAdminLessEmail = {
  firstName: 'James',
  email: '',
  password: 'Pr0band&',
};

const mockSuperAdminLessPassword = {
  firstName: 'James',
  email: 'some@email.com',
  password: '',
};

const mockSuperAdminPasswordError = {
  firstName: 'Zoe',
  email: 'zoeee@email.com',
  password: 'password',
};

afterEach(async () => {
  await superAdmins.collection.deleteMany();
});

describe('GET /api/super-admins', () => {
  test('If are super admins in data base status must be 200', async () => {
    const response = await request(app).get('/api/super-admins').send();
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body).toBeDefined();
    expect(response.body.message).toMatch('Super Admins list: ');
  });
  test('The status must be 404, if the url is wrong', async () => {
    const response = await request(app).get('/api/superAdmins').send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeUndefined();
  });
  describe('GET /api/super-admins', () => {
    test('Should return 404 if aren\'t super admins registered. And the message must be: Cannot find any Super Admin, please create one.', async () => {
      await superAdmins.collection.deleteMany({});
      const response = await request(app).get('/api/super-admins').send();
      expect(response.body.data).toBe(undefined);
      expect(response.status).toBe(404);
      expect(response.body.message).toMatch('Cannot find any Super Admin, please create one');
    });
  });
});

describe('GET BY ID /api/super-admins/:id', () => {
  test('Should return 200 if the id exist', async () => {
    const response = await request(app).get(`/api/super-admins/${superAdminSeed[0]._id}`).send();
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.data).toHaveProperty('_id', 'firstName', 'email', 'password');
    expect(response.body.message).toMatch(`Super Admin Found! ${superAdminSeed[0].firstName}`);
    expect(response.body.error).toBeFalsy();
  });
  test('The status must be 404, if the url is wrong', async () => {
    const response = await request(app).get('/api/superAdmins').send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeUndefined();
  });
  test('Should return status 400 if the id is not a mongoose id, and said The ID is not valid', async () => {
    const invalidId = '1';
    const response = await request(app).get(`/api/super-admins/${invalidId}`).send();
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch('The ID is not valid');
    expect(response.body.error).toBeTruthy();
  });
  test('Should return status 404 if the id does not exist', async () => {
    const nonExistentId = '678a4ffafc13ae184b753af0';
    const response = await request(app).get(`/api/super-admins/${nonExistentId}`).send();
    expect(response.status).toBe(404);
    expect(response.body.message).toMatch('Super Admin not found with this id');
    expect(response.body.error).toBeTruthy();
  });
});

describe('POST /api/super-admins', () => {
  test('The status must be 404, if the url is wrong', async () => {
    const response = await request(app).post('/api/superAdmins').send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeUndefined();
  });
  test('When create an super admin status must be 201, and must have firstName, email and password defined', async () => {
    const response = await request(app).post('/api/super-admins').send(mockSuperAdmin);
    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.data).toHaveProperty('firstName', 'email', 'password');
    expect(response.body.data.email).toMatch(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com$/);
    expect(response.body.message).toMatch('Super Admin Created!');
    expect(response.body.error).toBeFalsy();
  });
  test('When create a super admin status must be 400 if name is not defined', async () => {
    const response = await request(app).post('/api/super-admins').send(mockSuperAdminLessName);
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch('Name is required');
    expect(response.body.error).toBeTruthy();
  });
  test('When create an super admin status must be 400 if email is not defined', async () => {
    const response = await request(app).post('/api/super-admins').send(mockSuperAdminLessEmail);
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch('Email is required');
    expect(response.body.error).toBeTruthy();
  });
  test('When create an super admin status must be 400 if password is not defined', async () => {
    const response = await request(app).post('/api/super-admins').send(mockSuperAdminLessPassword);
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch('Error: Password is required.');
    expect(response.body.error).toBeTruthy();
  });
  test('When create an super admin status must be 400 if password is not valid', async () => {
    const response = await request(app).post('/api/super-admins').send(mockSuperAdminPasswordError);
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch('Password must have at least 1 special character ( <, >, @, #, ^, %, *, _, -, ?, ¿, ¡, ! ) 1 uppercase letter, 1 lowercase letter and 1 number');
    expect(response.body.error).toBeTruthy();
  });
  test('If email is already existing, status must be 409', async () => {
    const mockSuperAdminExistingEmail = {
      firstName: 'Maria',
      email: superAdminSeed[0].email,
      password: 'pAssw0rd!',
    };
    const response = await request(app).post('/api/super-admins').send(mockSuperAdminExistingEmail);
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch('This email is already used.');
    expect(response.body.error).toBeTruthy();
  });
});
