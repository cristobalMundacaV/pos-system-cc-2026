require('dotenv').config();

const { validateEnv } = require('./config/env');
validateEnv();

const app = require('./app');
const pool = require('./config/database');
const logger = require('./config/logger');

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  logger.info(
    {
      port: PORT,
      environment: process.env.NODE_ENV || 'development',
    },
    'Servidor POS iniciado correctamente'
  );
});

const shutdown = async (signal) => {
  logger.info(
    {
      signal,
    },
    'Señal recibida. Cerrando servidor de forma controlada'
  );

  server.close(async () => {
    try {
      await pool.end();

      logger.info('Pool de PostgreSQL cerrado correctamente.');
      process.exit(0);
    } catch (err) {
      logger.error(
        {
          err,
        },
        'Error cerrando pool de PostgreSQL'
      );

      process.exit(1);
    }
  });

  setTimeout(() => {
    logger.error('Cierre forzado por timeout.');
    process.exit(1);
  }, 10000).unref();
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

process.on('unhandledRejection', (reason) => {
  logger.error(
    {
      reason,
    },
    'Promesa rechazada no controlada'
  );
});

process.on('uncaughtException', (err) => {
  logger.error(
    {
      err,
    },
    'Excepción no controlada'
  );

  shutdown('uncaughtException');
});