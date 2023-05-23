import request from 'supertest';
import app from '../app';
import Class from '../models/class';
import classSeed from '../seeds/class';

// eslint-disable-next-line no-underscore-dangle
const classId = classSeed[0]._id.toString();

const mockClassA = {
  day: ['Monday', 'Saturday'],
  hour: '18:00',
  trainer: '646428fc0b6aa64a90624c05',
  activity: '646428fc0b6aa64a90624c05',
  slots: 3,
};

const mockClassB = {
  day: ['Monday', 'Saturday'],
  hour: '19:00',
  trainer: '646428fc0b6aa64a90624c05',
  activity: '646428fc0b6aa64a90624c05',
  slots: 3,
};

const mockClassC = {
  day: ['Monday', 'Saturday'],
  hour: '20:00',
  trainer: '646428fc0b6aa64a90624c05',
  activity: '646428fc0b6aa64a90624c05',
  slots: 3,
};

const mockClassRepeat = {
  day: ['Tuesday', 'Monday'],
  hour: '23:07',
  trainer: '646a3278743738c22171407b',
  activity: '646428fc0b6aa64a90624c05',
  slots: 3,
};

const mockClassInvalidId = {
  day: ['Tuesday', 'Monday'],
  hour: '16:07',
  trainer: '646428fc0b6aa64a90624c0',
  activity: '646428fc0b6aa64a90624c05',
  slots: 3,
};

beforeAll(async () => {
  await Class.collection.insertMany(classSeed);
});

describe('GET /api/classes', () => {
  test('Should return status 200 and false error.', async () => {
    const response = await request(app).get('/api/classes').send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
  });
  test('Should return an object containing an array of classes.', async () => {
    const response = await request(app).get('/api/classes').send();
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.data).toEqual(expect.arrayContaining([]));
    expect(response.body.error).toBeFalsy();
  });
  test('List of classes should not be empty.', async () => {
    const response = await request(app).get('/api/classes').send();
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.error).toBeFalsy();
  });
  test('Should return a message indicating "Complete list of classes".', async () => {
    const response = await request(app).get('/api/classes').send();
    expect(response.body.message).toBe('Complete list of classes.');
  });
  test('Should return status 404 and truth error.', async () => {
    const response = await request(app).get('/api/classe').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('Should return all properties of classes.', async () => {
    const response = await request(app).get('/api/classes').send();
    const classes = response.body.data;
    classes.forEach((classItem) => {
      expect(classItem).toHaveProperty('day');
      expect(classItem).toHaveProperty('hour');
      expect(classItem).toHaveProperty('trainer');
      expect(classItem).toHaveProperty('activity');
      expect(classItem).toHaveProperty('slots');
    });
    expect(response.error).toBeFalsy();
  });
});

describe('GETBYID /api/classes/:id', () => {
  test('Should return status 200 and false error.', async () => {
    const response = await request(app).get(`/api/classes/${classId}`).send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
  });
  test('Should return an object containing a message, a type of error, and data.', async () => {
    const response = await request(app).get(`/api/classes/${classId}`).send();
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('error');
  });
  test('Should return data as an object.', async () => {
    const response = await request(app).get(`/api/classes/${classId}`).send();
    expect(typeof response.body.data).toBe('object');
    expect(response.body.error).toBeFalsy();
  });
  // eslint-disable-next-line quotes
  test(`Should return a message indicating "Class ${classId} obtained".`, async () => {
    const response = await request(app).get(`/api/classes/${classId}`).send();
    expect(response.body.message).toBe(`Class ${classId} obtained.`);
    expect(response.body.error).toBeFalsy();
  });
  test('Should return all properties from the class.', async () => {
    const response = await request(app).get(`/api/classes/${classId}`).send();
    const classItem = response.body.data;
    expect(classItem).toHaveProperty('day');
    expect(classItem).toHaveProperty('hour');
    expect(classItem).toHaveProperty('trainer');
    expect(classItem).toHaveProperty('activity');
    expect(classItem).toHaveProperty('slots');
    expect(response.body.error).toBeFalsy();
  });
  test('Should return status 404 and a message indicating "Class not found".', async () => {
    const nonExistingId = '646a3278743738c22171407f';
    const response = await request(app).get(`/api/classes/${nonExistingId}`).send();
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Class not found.');
    expect(response.body.error).toBeTruthy();
  });
  test('Should return status 500 and a message indicating "Cannot get the class".', async () => {
    const invalidId = '123asd';
    const response = await request(app).get(`/api/classes/${invalidId}`).send();
    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Cannot get the class');
    expect(response.error).toBeTruthy();
  });
});

describe('POST /api/classes', () => {
  test('Should return status 201, and an object with data, message and error property.', async () => {
    const response = await request(app).post('/api/classes').send(mockClassA);
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('data');
    expect(response.body).toHaveProperty('message');
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBeFalsy();
  });
  test('Should return data as an object with at least one property and a creation message.', async () => {
    const response = await request(app).post('/api/classes').send(mockClassB);
    expect(typeof response.body.data).toBe('object');
    expect(Object.keys(response.body.data).length).toBeGreaterThan(0);
    expect(response.body.message).toBe('Class created.');
    expect(response.body.error).toBeFalsy();
  });
  test('Should return a message indicating "Trainer has another class scheduled".', async () => {
    const response = await request(app).post('/api/classes').send(mockClassRepeat);
    expect(response.body.message).toBe('Trainer has another class scheduled.');
    expect(response.body.error).toBeTruthy();
  });
  test('Should return all properties from the class.', async () => {
    const response = await request(app).post('/api/classes').send(mockClassC);
    const classItem = response.body.data;
    expect(classItem).toHaveProperty('day');
    expect(classItem).toHaveProperty('hour');
    expect(classItem).toHaveProperty('trainer');
    expect(classItem).toHaveProperty('activity');
    expect(classItem).toHaveProperty('slots');
    expect(response.body.error).toBeFalsy();
  });
  test('Should return error indicating "Member id must be a valid ObjectID".', async () => {
    const response = await request(app).post('/api/classes').send(mockClassInvalidId);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('There was an error: The member id must be a valid ObjectId');
    expect(response.body.error).toBeTruthy();
  });
});
