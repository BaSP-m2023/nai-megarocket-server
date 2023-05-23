/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../app';
import Member from '../models/member';
import memberSeed from '../seeds/member';

const mockMember = {
  firstName: 'unc',
  lastName: 'Chat',
  dni: 27750137,
  phone: 5634921235,
  email: 'dchattc@operado4.com',
  password: 'g5Fj4sT9',
  city: 'Ołpiny',
  birthDay: '1976-09-09T03:00:00.000Z',
  postalCode: 27678,
  isActive: false,
  membership: 'Classic',
};

const mockMemberName = {
  firstName: 'holis',
};

const invalidId = '27750127M@M';
const nonExistingId = '645ea2e59338b2a987456321';

beforeAll(async () => {
  await Member.collection.insertMany(memberSeed);
});
describe('PUT /api/members/id', () => {
  test(
    'it should return status 200 when updating an existing member with valid data',
    async () => {
      const response = await request(app).put(`/api/members/${memberSeed[1]._id.toString()}`)
        .send(mockMember);
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
      // eslint-disable-next-line no-underscore-dangle
      const response = await request(app).delete(`/api/members/${memberSeed[0]._id}`);
      expect(response.status).toBe(404);
      // eslint-disable-next-line no-underscore-dangle
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
