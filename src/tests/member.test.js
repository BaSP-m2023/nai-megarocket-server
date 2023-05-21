import request from 'supertest';
import app from '../app';
import Member from '../models/member';
import memberSeed from '../seeds/member';

const mockMember = {
  firstName: 'Adolf',
  lastName: 'Rodriguez',
  dni: 34050981,
  phone: 5372456337,
  email: 'rpadsfi@google.com',
  password: 'u1Xas6cZ8',
  city: 'Ciparay',
  birthDay: '1979-07-12T03:00:00.000Z',
  postalCode: 86049,
  isActive: true,
  membership: 'Black',
};

/* const mockRepeatedEmail = {
  firstName: 'Adoslf',
  lastName: 'Rodsriguez',
  dni: 34053981,
  phone: 5373456337,
  email: 'dchattc@opera.com',
  password: 's1Xas6cZ8',
  city: 'siparay',
  birthDay: '1978-06-12T03:00:00.000Z',
  postalCode: 85049,
  isActive: true,
  membership: 'Black',
}; */

beforeEach(async () => {
  await Member.collection.insertMany(memberSeed);
});

afterEach(async () => {
  await Member.collection.deleteMany();
});

describe('GET /api/members', () => {
  test('Should bring data', async () => {
    const response = await request(app).get('/api/members').send();
    expect(response).toBeTruthy();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('If wrong URL status 404', async () => {
    const response = await request(app).get('/api/member').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('If no members, correct error message', async () => {
    Member.collection.deleteMany();
    const response = await request(app).get('/api/members').send();
    expect(response).toBeTruthy();
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('No Members on the list, please create one.');
  });
});

describe('GET BY ID /api/members/:id', () => {
  test('If correct ID should found member', async () => {
    const firstMember = await Member.findOne();
    // eslint-disable-next-line no-underscore-dangle
    const firstId = firstMember._id;
    const response = await request(app).get(`/api/members/${firstId}`).send();
    expect(response).toBeTruthy();
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('_id', 'firstName', 'lastName', 'dni', 'phone', 'email', 'password', 'city', 'birthDay', 'postalCode', 'isActive', 'membership');
    expect(response.error).toBeFalsy();
  });
  test('If incorrect ID, gives correct error message', async () => {
    const incorrectId = '645ea2e59338b2a843989320';
    const response = await request(app).get(`/api/members/${incorrectId}`).send();
    expect(response).toBeTruthy();
    expect(response.status).toBe(404);
    expect(response.body.message).toBe(`Member not found with id: ${incorrectId}`);
  });
  test('If wrong URL status 404', async () => {
    const response = await request(app).get('/api/member/:id').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('POST /api/members', () => {
  test('Post correctly when the right data is sent.', async () => {
    const response = await request(app).post('/api/members').send(mockMember);
    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty('_id', 'firstName', 'lastName', 'dni', 'phone', 'email', 'password', 'city', 'birthDay', 'postalCode', 'isActive', 'membership');
    expect(response.error).toBeFalsy();
  });
  /* test('Error 400 if repeated email', async () => {
    const response = await request(app).post('/api/members').send(mockRepeatedEmail);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Email already exists in the database, please check.');
  }); */
});
