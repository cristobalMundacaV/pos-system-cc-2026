const router = require('express').Router();
const ctrl = require('../controllers/saleController');
const { authMiddleware, requireRole } = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  idParamValidator,
  saleCreateValidator,
} = require('../validators');

router.get('/', authMiddleware, ctrl.getAll);
router.get('/:id', authMiddleware, idParamValidator, validate, ctrl.getById);
router.post('/', authMiddleware, saleCreateValidator, validate, ctrl.create);
router.put('/:id/cancel', authMiddleware, requireRole(['admin']), idParamValidator, validate, ctrl.cancel);

module.exports = router;