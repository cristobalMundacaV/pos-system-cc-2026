const requiredEnvVars = [
  'DB_HOST',
  'DB_PORT',
  'DB_NAME',
  'DB_USER',
  'DB_PASSWORD',
  'JWT_SECRET',
];

function validateEnv() {
  const missing = requiredEnvVars.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Faltan variables de entorno requeridas: ${missing.join(', ')}`);
  }

  if (process.env.JWT_SECRET === 'secreto_temporal_cambiar') {
    throw new Error('JWT_SECRET no puede usar el valor temporal por seguridad.');
  }
}

module.exports = { validateEnv };