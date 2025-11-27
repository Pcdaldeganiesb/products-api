// src/tests/auth.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = require('../app');
const User = require('../models/User');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Auth routes', () => {
  it('should register a user', async () => {
    const res = await request(app).post('/api/v1/auth/register').send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
  });

  it('should login the user', async () => {
    // Usuário já criado no teste anterior
    const res = await request(app).post('/api/v1/auth/login').send({
      email: 'test@example.com',
      password: 'password123'
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not register duplicate email', async () => {
    const res = await request(app).post('/api/v1/auth/register').send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });

    expect(res.statusCode).toBe(409);
  });
});
