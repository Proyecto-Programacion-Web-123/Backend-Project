const request = require('supertest');
const express = require('express');

jest.mock('../../controllers/orderController', () => ({
  getAll: jest.fn(async (req, res) => res.status(200).json([{ id_order: 1 }])),
  getById: jest.fn(async (req, res) => {
    const id = Number(req.params.id);
    if (id === 404) return res.status(404).json({ error: 'Order not found' });
    return res.status(200).json({ id_order: id });
  }),
  create: jest.fn(async (req, res) => res.status(201).json([41])),
  update: jest.fn(async (req, res) => res.status(200).json(1)),
  delete: jest.fn(async (req, res) => res.status(204).send()),
  remove: jest.fn(async (req, res) => res.status(204).send())
}));

const orderRoutes = require('../orderRoutes');

function makeApp() {
  const app = express();
  app.use(express.json());
  app.use('/orders', orderRoutes);
  return app;
}

describe('Order routes (mocked controller)', () => {
  let app;
  beforeAll(() => { app = makeApp(); });

  test('GET /orders -> 200', async () => {
    const r = await request(app).get('/orders');
    expect(r.status).toBe(200);
  });

  test('GET /orders/2 -> 200', async () => {
    const r = await request(app).get('/orders/2');
    expect(r.status).toBe(200);
    expect(r.body).toEqual({ id_order: 2 });
  });

  test('GET /orders/404 -> 404', async () => {
    const r = await request(app).get('/orders/404');
    expect(r.status).toBe(404);
  });

  test('POST /orders -> 201', async () => {
    const r = await request(app).post('/orders').send({});
    expect(r.status).toBe(201);
  });

  test('PUT /orders/1 -> 200', async () => {
    const r = await request(app).put('/orders/1').send({});
    expect(r.status).toBe(200);
  });

  test('DELETE /orders/1 -> 204', async () => {
    const r = await request(app).delete('/orders/1');
    expect(r.status).toBe(204);
  });
});
