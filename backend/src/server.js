require('dotenv').config();

const { validateEnv } = require('./config/env');
validateEnv();

const app = require('./app');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor POS corriendo en http://localhost:${PORT}`);
  console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
});