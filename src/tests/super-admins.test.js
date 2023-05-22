import request from 'supertest';
import app from '../app';
import superAdmins from '../models/super-admins';
import superAdminsSeed from '../seeds/super-admins';

const mockSuperAdminSameInfo = {
  firstName: 'SuperAdmin',
  email: 'SuperAdmin@gmail.com',
  password: 'SuperAdmin1234',
};
const mockSuperAdminName = {
  firstName: 'SAdminChange',
};
const mockSuperAdminEmail = {
  email: 'SAdminChange@gmail.com',
};
const mockSuperAdminPass = {
  password: 'SAdminChange1234',
};
const mockSuperAdminEmailOnDB = {
  email: 'SuperAdmin2@gmail.com',
};
beforeAll(async () => {
  await superAdmins.collection.insertMany(superAdminsSeed);
});
describe('PUT /api/super-admins', () => {
  test('Sending same data as in the DB, should return a status 404 and a message', async () => {
    const response = await request(app).put('/api/super-admins/6460565349c6fa0cfd69db89').send(mockSuperAdminSameInfo);
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeUndefined();
  });
  test('No body is send on the request, should return a status 400 and a message', async () => {
    const response = await request(app).put('/api/super-admins/6460565349c6fa0cfd69db89').send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeUndefined();
  });
  test('No body and no Id is send on the request, should return a status 400 and a message', async () => {
    const response = await request(app).put('/api/super-admins/').send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeUndefined();
  });
  test('No Id is send on the request, should return a status 400 and a message', async () => {
    const response = await request(app).put('/api/super-admins/').send(mockSuperAdminSameInfo);
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeUndefined();
  });
  test('Correct Id and change on the Name is send, status 200 and a message', async () => {
    const response = await request(app).put('/api/super-admins/6460565349c6fa0cfd69db89').send(mockSuperAdminName);
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeDefined();
  });
  test('Correct Id and change on the Email is send, status 200 and a message', async () => {
    const response = await request(app).put('/api/super-admins/6460565349c6fa0cfd69db89').send(mockSuperAdminEmail);
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeDefined();
  });
  test('Correct Id and change on the Password is send, status 200 and a message', async () => {
    const response = await request(app).put('/api/super-admins/6460565349c6fa0cfd69db89').send(mockSuperAdminPass);
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeDefined();
  });
  test('Correct Id with an Email thats on the DB, status 404 and a message', async () => {
    const response = await request(app).put('/api/super-admins/6460565349c6fa0cfd69db89').send(mockSuperAdminEmailOnDB);
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeUndefined();
  });
  test('Id that is not on the DB, status 404 and a message', async () => {
    const response = await request(app).put('/api/super-admins/6460565349c6fa0cfd69db87').send(mockSuperAdminEmailOnDB);
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeUndefined();
  });
  test('Invalid Id is send, status 404 and a message', async () => {
    const response = await request(app).put('/api/super-admins/HolaSoyUnID').send(mockSuperAdminEmailOnDB);
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeUndefined();
  });
});
describe('DEL /api/super-admins', () => {
  test('Invalid Id is send, status 404 and a message', async () => {
    const response = await request(app).del('/api/super-admins/HolaSoyUnID').send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeUndefined();
  });
  test('Id that is not on the DB, status 404 and a message', async () => {
    const response = await request(app).del('/api/super-admins/6460565349c6fa0cfd69db87').send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeUndefined();
  });
  test('Correct Id, status 200 and a message', async () => {
    const response = await request(app).del('/api/super-admins/6460565349c6fa0cfd69db89').send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeDefined();
  });
});
