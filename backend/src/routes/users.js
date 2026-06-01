const router = require('express').Router();
const ctrl = require('../controllers/userController');
const { authMiddleware, requireRole } = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  idParamValidator,
  userCreateValidator,
  userUpdateValidator,
} = require('../validators');

router.get('/', authMiddleware, requireRole(['admin']), ctrl.getAll);
router.post('/', authMiddleware, requireRole(['admin']), userCreateValidator, validate, ctrl.create);
router.put('/:id', authMiddleware, requireRole(['admin']), userUpdateValidator, validate, ctrl.update);
router.delete('/:id', authMiddleware, requireRole(['admin']), idParamValidator, validate, ctrl.remove);

module.exports = router;