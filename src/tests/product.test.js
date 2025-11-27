// src/tests/product.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const app = require('../app'); 
const Product = require('../models/Product');
const User = require('../models/User');

let mongoServer;
let authToken;

beforeAll(async () => {
  // Inicia banco em memória
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);

  await Product.deleteMany({});
  await User.deleteMany({});

  // cria usuário e obtém token
  const resReg = await request(app).post('/api/v1/auth/register').send({
    name: 'Prod Tester',
    email: 'prod@test.com',
    password: 'password123'
  });

  authToken = resReg.body.token;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Product routes', () => {
  it('should create a product (protected)', async () => {
    const res = await request(app)
      .post('/api/v1/products')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ name: 'Produto A', price: 10.5, stock: 5 });

    expect(res.statusCode).toBe(201);
    expect(res.body.product).toHaveProperty('_id');
  });

  it('should get products (public)', async () => {
    const res = await request(app).get('/api/v1/products');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.products)).toBe(true);
  });

  it('should update a product (protected)', async () => {
    const product = await Product.findOne({ name: 'Produto A' });

    const res = await request(app)
      .put(`/api/v1/products/${product._id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ price: 12.0 });

    expect(res.statusCode).toBe(200);
    expect(res.body.product.price).toBe(12.0);
  });

  it('should delete a product (protected)', async () => {
    const product = await Product.findOne({ name: 'Produto A' });

    const res = await request(app)
      .delete(`/api/v1/products/${product._id}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.statusCode).toBe(200);
  });
});
