const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const order_detailRoutes = require('./routes/order_detailRoutes');

const app = express();

/* CORS */
const FRONTEND_URL = process.env.WEB_ORIGIN || 'http://localhost:3001';
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  exposedHeaders: ['Content-Type', 'Authorization']
}));

/* Preflight manual (por si algún proxy bloquea) */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', FRONTEND_URL);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  // Evita respuestas 304 usando no-cache
  res.header('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', '0');
  if (req.method === 'OPTIONS') return res.status(200).end();
  next();
});

/* Body parsing */
app.use(express.json({ limit: '1mb' }));

/* Rutas */
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/order_details', order_detailRoutes);

/* Healthcheck */
app.get('/health', (_req, res) => res.status(200).json({ ok: true }));

/* 404 controlado */
app.use((req, res) => {
  res.status(404).json({ error: 'Not found', path: req.originalUrl });
});

/* Manejador de errores */
app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  const payload = {
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' ? undefined : err.message
  };
  res.status(status).json(payload);
});

module.exports = app;
