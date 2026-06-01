const router = require('express').Router();
const ctrl = require('../controllers/categoryController');
const { authMiddleware, requireRole } = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  idParamValidator,
  categoryCreateValidator,
  categoryUpdateValidator,
} = require('../validators');

router.get('/', authMiddleware, ctrl.getAll);
router.post('/', authMiddleware, requireRole(['admin']), categoryCreateValidator, validate, ctrl.create);
router.put('/:id', authMiddleware, requireRole(['admin']), categoryUpdateValidator, validate, ctrl.update);
router.delete('/:id', authMiddleware, requireRole(['admin']), idParamValidator, validate, ctrl.remove);

module.exports = router;