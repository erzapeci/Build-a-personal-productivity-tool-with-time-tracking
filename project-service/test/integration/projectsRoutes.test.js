const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../server');
const Project = require('../../models/Project');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterEach(async () => {
  await Project.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Projects API', () => {
  const testProject = {
    title: 'Test Project',
    description: 'Ky është një projekt testues',
    userEmail: 'erza@example.com',
  };

  it('duhet të krijojë një projekt të ri', async () => {
    const res = await request(app).post('/api/projects').send(testProject);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.title).toBe(testProject.title);
  });

  it('duhet të kthejë të gjitha projektet për një userEmail', async () => {
    await Project.create(testProject);
    const res = await request(app)
      .get('/api/projects')
      .query({ userEmail: testProject.userEmail });
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].userEmail).toBe(testProject.userEmail);
  });

  it('duhet të përditësojë një projekt ekzistues', async () => {
    const created = await Project.create(testProject);
    const res = await request(app)
      .put(`/api/projects/${created._id}`)
      .send({ title: 'Projekti i Përditësuar' });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Projekti i Përditësuar');
  });

  it('duhet të fshijë një projekt', async () => {
    const created = await Project.create(testProject);
    const res = await request(app).delete(`/api/projects/${created._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Project deleted successfully');
  });
});
