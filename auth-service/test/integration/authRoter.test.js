const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../server'); // Sigurohu që në server.js e ke export app
const User = require('../../models/User');

beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/testDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterEach(async () => {
  await User.deleteMany(); // pastro databazën pas çdo testi
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Auth Routes', () => {
  it('duhet të regjistrojë përdorues me sukses', async () => {
    const res = await request(app).post('/register').send({
      name: 'Erza',
      email: 'erza@example.com',
      password: 'sekret123',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'User created');
    expect(res.body.user).toHaveProperty('email', 'erza@example.com');
  });

  it('duhet të bëjë login dhe të kthejë token', async () => {
    // Fillimisht krijo përdoruesin
    await request(app).post('/register').send({
      name: 'Erza',
      email: 'erza@example.com',
      password: 'sekret123',
    });

    // Tani bëj login
    const res = await request(app).post('/login').send({
      email: 'erza@example.com',
      password: 'sekret123',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('duhet të japë error nëse passwordi është gabim', async () => {
    await request(app).post('/register').send({
      name: 'Erza',
      email: 'erza@example.com',
      password: 'sekret123',
    });

    const res = await request(app).post('/login').send({
      email: 'erza@example.com',
      password: 'gabim123',
    });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error', 'Invalid password');
  });
});
