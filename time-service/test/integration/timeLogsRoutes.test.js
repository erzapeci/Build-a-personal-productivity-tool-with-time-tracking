const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../server');
const TimeLog = require('../../models/TimeLog');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL);
});

afterEach(async () => {
  await TimeLog.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('TimeLogs API', () => {
  const testLog = {
    userEmail: 'test@example.com',
    projectId: '60f7e8f9c25e4f001f74e1b1',
    startTime: new Date(),
    endTime: new Date()
  };

  it('duhet të krijojë një log të ri', async () => {
    const res = await request(app).post('/api/timelogs').send(testLog);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.userEmail).toBe(testLog.userEmail);
  });

  it('duhet të kthejë logët për një user', async () => {
    await TimeLog.create(testLog);
    const res = await request(app).get('/api/timelogs?userEmail=test@example.com');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].userEmail).toBe('test@example.com');
  });

  it('duhet të fshijë një log', async () => {
    const created = await TimeLog.create(testLog);
    const res = await request(app).delete(`/api/timelogs/${created._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Time log deleted successfully');
  });
});
