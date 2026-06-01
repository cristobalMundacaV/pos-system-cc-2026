require('dotenv').config();

const { validateEnv } = require('./config/env');
validateEnv();

const app = require('./app');
const pool = require('./config/database');

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`Servidor POS corriendo en http://localhost:${PORT}`);
  console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
});

const shutdown = async (signal) => {
  console.log(`\n${signal} recibido. Cerrando servidor de forma controlada...`);

  server.close(async () => {
    try {
      await pool.end();
      console.log('Pool de PostgreSQL cerrado correctamente.');
      process.exit(0);
    } catch (err) {
      console.error('Error cerrando pool de PostgreSQL:', err.message);
      process.exit(1);
    }
  });

  setTimeout(() => {
    console.error('Cierre forzado por timeout.');
    process.exit(1);
  }, 10000).unref();
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

process.on('unhandledRejection', (reason) => {
  console.error('Promesa rechazada no controlada:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('Excepción no controlada:', err);
  shutdown('uncaughtException');
});