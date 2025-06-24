const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../server');
const Task = require('../../models/Task');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Task.deleteMany({});
});

describe('Task API', () => {
  it('POST /api/tasks - should create a new task', async () => {
    const taskData = {
      title: 'API Task',
      description: 'Created by supertest',
      userEmail: 'api@example.com',
    };

    const res = await request(app)
      .post('/api/tasks')
      .send(taskData)
      .expect(201);

    expect(res.body._id).toBeDefined();
    expect(res.body.title).toBe(taskData.title);
  });

  it('GET /api/tasks?userEmail= - should return tasks for user', async () => {
    await Task.create({
      title: 'User Task',
      description: 'Task for user',
      userEmail: 'user@example.com',
    });

    const res = await request(app)
      .get('/api/tasks')
      .query({ userEmail: 'user@example.com' })
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].userEmail).toBe('user@example.com');
  });
});
