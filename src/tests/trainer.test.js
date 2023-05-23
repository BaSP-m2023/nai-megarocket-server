import request from 'supertest';
import app from '../app';
import Trainer from '../models/trainer';
import trainerSeed from '../seeds/trainer';

const mockTrainerWithSameData = {
  dni: 12345679,
  email: 'asdan.pereza@example.com',
};

const mockTrainerToEdit = {
  firstName: 'testing',
  lastName: 'testinger',
};

beforeEach(async () => {
  await Trainer.collection.insertMany(trainerSeed);
});

afterEach(async () => {
  await Trainer.collection.deleteMany();
});

describe('PUT /api/trainers/:id', () => {
  test('should return status 400 if the ID is invalid', async () => {
    const mockId = '@a@invalid@id';
    const response = await request(app).put(`/api/trainers/${mockId}`).send();
    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(response.body.message).toMatch(/(invalid)/gi);
    expect(response.body.error).toBeTruthy();
  });

  test('should return status 404 if is not found', async () => {
    const mockId = '646428fc0b6aa64a90624c00';
    const response = await request(app).put(`/api/trainers/${mockId}`).send();
    expect(response.status).toBe(404);
    expect(response.body.message).toBeDefined();
    expect(response.body.error).toBeTruthy();
  });

  test('should return status 400 if there is other trainer with the same data', async () => {
    const { _id } = await Trainer.collection.findOne({
      $or:
      [
        { dni: { $ne: mockTrainerWithSameData.dni } },
        { email: { $ne: mockTrainerWithSameData.email } },
      ],
    });
    const response = await request(app).put(`/api/trainers/${_id}`).send(mockTrainerWithSameData);
    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(response.body.message).toMatch(/(exists)/);
    expect(response.body.error).toBeTruthy();
  });

  test('should return status 200 if the trainer is updated', async () => {
    const { _id } = await Trainer.collection.findOne();
    const response = await request(app).put(`/api/trainers/${_id}`).send(mockTrainerToEdit);
    expect(response.status).toBe(200);
    expect(response.body.message).toBeDefined();
    expect(response.body.message).toMatch(/(updated)/gi);
    expect(response.body.error).toBeFalsy();
  });
});

describe('DELETE /api/trainers/:id', () => {
  test('should return status 400 if the ID is invalid', async () => {
    const mockId = '@a@invalid@id';
    const response = await request(app).delete(`/api/trainers/${mockId}`).send();
    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(response.body.message).toMatch(/(invalid)/gi);
    expect(response.body.error).toBeTruthy();
  });

  test('should return status 404 if is not found', async () => {
    const mockId = '646428fc0b6aa64a90624c00';
    const response = await request(app).delete(`/api/trainers/${mockId}`).send();
    expect(response.status).toBe(404);
    expect(response.body.message).toBeDefined();
    expect(response.body.error).toBeTruthy();
  });

  test('should return status 200 if the trainer was deleted', async () => {
    const { _id } = await Trainer.collection.findOne();
    const response = await request(app).delete(`/api/trainers/${_id}`).send();
    expect(response.status).toBe(200);
    expect(response.body.message).toBeDefined();
    expect(response.body.message).toMatch(/(deleted)/gi);
    expect(response.body.error).toBeFalsy();
  });
});
