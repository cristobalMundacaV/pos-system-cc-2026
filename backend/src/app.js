require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const pool = require('./config/database');

const authRoutes     = require('./routes/auth');
const productRoutes  = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const clientRoutes   = require('./routes/clients');
const saleRoutes     = require('./routes/sales');
const reportRoutes   = require('./routes/reports');
const userRoutes     = require('./routes/users');
const evalRoutes     = require('./routes/eval');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const app = express();

// ─── CORS ────────────────────────────────────────────────────────────────────
// ✅ SEGURIDAD: CORS restringido a origen específico
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(helmet());

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Demasiadas solicitudes desde esta IP. Intenta nuevamente más tarde.',
  },
});

app.use('/api', apiLimiter);

// ─── PARSERS ─────────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── ARCHIVOS ESTÁTICOS (imágenes) ───────────────────────────────────────────
// TODO: Eliminar cuando se migre a almacenamiento en la nube (S3, GCS, etc.)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// ─── HEALTH CHECK ────────────────────────────────────────────────────────────
// ✅ DISPONIBILIDAD: Endpoint requerido para Load Balancers, ECS, Kubernetes, etc.
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// ─── ROOT ENDPOINT ───────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ 
    name: 'POS System API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: 'GET /health',
      auth: 'POST /api/auth/login',
      products: 'GET /api/products',
      categories: 'GET /api/categories',
      clients: 'GET /api/clients',
      sales: 'GET /api/sales',
      reports: 'GET /api/reports',
      users: 'GET /api/users'
    },
    frontend: 'http://localhost:3000',
    note: 'La interfaz gráfica está disponible en http://localhost:3000'
  });
});

// ─── RUTAS ───────────────────────────────────────────────────────────────────
app.use('/api/auth',       authRoutes);
app.use('/api/products',   productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/clients',    clientRoutes);
app.use('/api/sales',      saleRoutes);
app.use('/api/reports',    reportRoutes);
app.use('/api/users',      userRoutes);
app.use('/api/eval',       evalRoutes);  // Ruta de evaluación docente (requiere EVAL_SECRET)

// ─── HEALTH CHECKS ────────────────────────────────────────────────────────────
// Liveness: indica que el proceso Node está vivo.
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'pos-backend',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Readiness: indica que la API está lista y puede comunicarse con PostgreSQL.
app.get('/ready', async (_req, res) => {
  try {
    await pool.query('SELECT 1');

    res.json({
      status: 'ready',
      service: 'pos-backend',
      db: 'ok',
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    res.status(503).json({
      status: 'not_ready',
      service: 'pos-backend',
      db: 'unreachable',
      error: process.env.NODE_ENV === 'production' ? undefined : err.message,
      timestamp: new Date().toISOString(),
    });
  }
});

// ─── MANEJO DE ERRORES GLOBAL ────────────────────────────────────────────────
// TODO: Reemplazar console.error con logging estructurado (Winston, Pino, etc.)
//       e integrar con servicio de monitoreo (CloudWatch, Datadog, Sentry, etc.)
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('[ERROR]', err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Error interno del servidor' });
});

module.exports = app;
