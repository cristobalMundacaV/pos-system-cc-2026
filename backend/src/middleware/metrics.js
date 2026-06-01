const client = require('prom-client');

const register = new client.Registry();

client.collectDefaultMetrics({
  register,
  prefix: 'pos_backend_',
});

const httpRequestDuration = new client.Histogram({
  name: 'pos_backend_http_request_duration_seconds',
  help: 'Duración de las solicitudes HTTP en segundos',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.05, 0.1, 0.3, 0.5, 1, 2, 5],
});

register.registerMetric(httpRequestDuration);

function normalizeRoute(path) {
  return path
    .replace(/\/\d+/g, '/:id')
    .replace(/[?].*$/, '');
}

function metricsMiddleware(req, res, next) {
  const start = process.hrtime();

  res.on('finish', () => {
    const diff = process.hrtime(start);
    const duration = diff[0] + diff[1] / 1e9;

    httpRequestDuration
      .labels(req.method, normalizeRoute(req.path), String(res.statusCode))
      .observe(duration);
  });

  next();
}

async function metricsHandler(_req, res) {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
}

module.exports = {
  metricsMiddleware,
  metricsHandler,
};