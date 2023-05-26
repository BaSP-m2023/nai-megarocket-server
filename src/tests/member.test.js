/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../app';
import Member from '../models/member';
import memberSeed from '../seeds/member';

const mockMemberUpdate = {
  firstName: `${memberSeed[0].firstName}`,
  lastName: `${memberSeed[0].lastName}`,
  dni: `${memberSeed[0].dni}`,
  phone: `${memberSeed[0].phone}`,
  email: `${memberSeed[0].email}`,
  password: `${memberSeed[0].password}`,
  city: `${memberSeed[0].city}`,
  birthDay: `${memberSeed[0].birthDay}`,
  postalCode: `${memberSeed[0].postalCode}`,
  isActive: `${memberSeed[0].isActive}`,
  membership: `${memberSeed[0].membership}`,
};

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

const mockRepeatedEmail = {
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
};

const mockRepeatedDni = {
  firstName: 'asdslf',
  lastName: 'Rodsfriguez',
  dni: 39189584,
  phone: 5373456337,
  email: 'dcasattc@opera.com',
  password: 's1Xas6cZ8',
  city: 'siparay',
  birthDay: '1978-06-12T03:00:00.000Z',
  postalCode: 85049,
  isActive: true,
  membership: 'Black',
};

const mockMemberName = {
  firstName: 'Bumblebee',
};

const invalidId = '27750127M@M';
const nonExistingId = '645ea2e59338b2a987456321';

beforeEach(async () => {
  await Member.collection.insertMany(memberSeed);
});

afterEach(async () => {
  await Member.collection.deleteMany();
});

describe('PUT /api/members/id', () => {
  test(
    'it should return status 200 when updating an existing member with valid data',
    async () => {
      const response = await request(app).put(`/api/members/${memberSeed[0]._id.toString()}`)
        .send(mockMemberUpdate);
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
    },
  );
  test('should return status 400 when updating a member with invalid Id', async () => {
    const response = await request(app).put(`/api/members/${invalidId}`).send(mockMemberName);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('Invalid ID');
  });
  test('should return status 404, when updating a non-existent member', async () => {
    const response = await request(app).put(`/api/members/${nonExistingId}`).send(mockMemberName);
    expect(response.body.message).toBe(`The member with id: ${nonExistingId} was not found`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
  });
  test('It should return status 400 when the body is empty', async () => {
    const response = await request(app).put(`/api/members/${memberSeed[1]._id}`).send();
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('The body cannot be empty');
    expect(response.error).toBeTruthy();
  });
});

describe('GET /api/members', () => {
  test('Should bring data', async () => {
    const response = await request(app).get('/api/members').send();
    expect(response).toBeTruthy();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
  });
  test('If no members, correct error message', async () => {
    Member.collection.deleteMany();
    const response = await request(app).get('/api/members').send();
    expect(response).toBeTruthy();
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('No Members on the list, please create one.');
  });
  test('If wrong URL status 404', async () => {
    const response = await request(app).get('/api/member').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('DELETE /api/members', () => {
  test('It should return status 200 when deleting a member', async () => {
    const response = await request(app).delete(`/api/members/${memberSeed[0]._id}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe(`Member ${memberSeed[0].firstName} deleted`);
    expect(response.body.error).toBeFalsy();
  });
  test(
    'It should return a status 404 when deleting a member that was already deleted',
    async () => {
      Member.collection.deleteMany();
      // eslint-disable-next-line no-underscore-dangle
      const response = await request(app).delete(`/api/members/${memberSeed[0]._id}`);
      expect(response.status).toBe(404);
      expect(response.body.message).toBeDefined();
      expect(response.body.error).toBeTruthy();
      expect(response.body.data).toBeUndefined();
    },
  );
  test('It should return status 400 when an Id is invalid', async () => {
    const response = await request(app).delete(`/api/members/${invalidId}`);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('A valid Id is required');
    expect(response.body.error).toBeTruthy();
  });
});

describe('GET BY ID /api/members/:id', () => {
  test('If correct ID should found member', async () => {
    const firstMember = await Member.findOne();
    const firstId = firstMember._id;
    const response = await request(app).get(`/api/members/${firstId}`).send();
    expect(response).toBeTruthy();
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('_id', 'firstName', 'lastName', 'dni', 'phone', 'email', 'password', 'city', 'birthDay', 'postalCode', 'isActive', 'membership');
    expect(response.body.error).toBeFalsy();
  });
  test('If incorrect ID, gives correct error message', async () => {
    const incorrectId = '645ea2e59338b2a843989320';
    const response = await request(app).get(`/api/members/${incorrectId}`).send();
    expect(response).toBeTruthy();
    expect(response.status).toBe(404);
    expect(response.body.message).toBe(`Member not found with id: ${incorrectId}`);
    expect(response.body.error).toBeTruthy();
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
    const { _id, __v, ...res } = response.body.data;
    expect(response.status).toBe(201);
    expect(res).toEqual(mockMember);
    expect(response.body.error).toBeFalsy();
  });
  test('Error 400 if repeated email', async () => {
    const response = await request(app).post('/api/members').send(mockRepeatedEmail);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email or Dni already exists');
    expect(response.body.error).toBeTruthy();
  });
  test('Error 400 if repeated Dni', async () => {
    const response = await request(app).post('/api/members').send(mockRepeatedDni);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email or Dni already exists');
    expect(response.body.error).toBeTruthy();
  });
  test('If wrong URL status 404', async () => {
    const response = await request(app).post('/api/member').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});
