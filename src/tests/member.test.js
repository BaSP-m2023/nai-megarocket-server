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

const invalidId = '27750127M@M';

beforeAll(async () => {
  await Member.collection.insertMany(memberSeed);
});
describe('PUT /api/members/id', () => {
  test(
    'it should return status 200 when updating an existing member with valid data',
    async () => {
      const response = await request(app).put(`/api/members/${memberSeed[1]._id.toString()}`).send(mockMember);
      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
    },
  );
  test('should return status 400 when updating a member with invalid Id', async () => {
    const response = await request(app).put(`/api/members/${invalidId}`).send();
    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('Invalid ID');
  });
});
// test('length of array should be greater than 0', async () => {
//   const response = (await request(app).put(`/api/members/${memberSeed.object()}`)).send();
//   console.log(response.body.message);
//   expect(response.body.data.length).toBeGreaterThan(0);
//   expect(response.body.data.length).toBe(2);
//   expect(response.status).toBe(200);
//   expect(response.body.error).toBeFalsy();
// });
// test('should return status 404, when updating a non-existent member', async () => {
//   const response = await request(app).put(`/api/members/${invalidId}`).send(mockMember);
//   expect(response.body.message).toBe('That member does not exist');
//   expect(response.status).toBe(404);
//   expect(response.body.error).toBeTruthy();
// });
//   test('It should return status 400 when the input is empty', async () => {
//     const response = await request(app).put(`/api/members/${Member[1]._id}`).send();
//     expect(response.status).toBe(400);
//     expect(response.body.message).toBe('Data is required');
//     expect(response.error).toBeTruthy();
//   });
// });

// // eslint-disable-next-line no-underscore-dangle
// // const mockMemberId = response.body.data._id;

// // const mockMemberId = '645ea2e59338b2a843989321';

// describe('DELETE /api/members', () => {
//   test('It should return status 204 when deleting a member', async () => {
//     const response = await request(app).delete(`/api/members/${Member[0]._id}`);
//     expect(response.status).toBe(204);
//     expect(response.body.message).toBe('Member deleted successfully');
//     expect(response.body.error).toBeFalsy();
//   });
//   test(
//     'It should return a status 404 when deleting a member that was already deleted',
//     async () => {
//     // eslint-disable-next-line no-underscore-dangle
//       const response = await request(app).delete(`/api/members/${invalidId}`);
//       expect(response.status).toBe(404);
//       // eslint-disable-next-line no-underscore-dangle
//       expect(response.body.message).toBe(`The member ${Member[2]._id} was already deleted`);
//       expect(response.body.error).toBeTruthy();
//       expect(response.body.data).toBeUndefined();
//     },
//   );
//   test('It should return status 400 when an Id is invalid', async () => {
//     const response = await request(app).delete(`/api/members/${invalidId}`);
//     expect(response.status).toBe(400);
//     expect(response.body.message).toBe('A valid Id is required');
//     expect(response.body.error).toBeTruthy();
//   });
// });
