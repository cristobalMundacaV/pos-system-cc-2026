const router = require('express').Router();
const ctrl = require('../controllers/productController');
const { authMiddleware, requireRole } = require('../middleware/auth');
const upload = require('../middleware/upload');
const validate = require('../middleware/validate');
const {
  idParamValidator,
  productCreateValidator,
  productUpdateValidator,
  searchValidator,
} = require('../validators');

router.get('/', authMiddleware, searchValidator, validate, ctrl.getAll);
router.get('/:id', authMiddleware, idParamValidator, validate, ctrl.getById);
router.post('/', authMiddleware, requireRole(['admin']), upload.single('imagen'), productCreateValidator, validate, ctrl.create);
router.put('/:id', authMiddleware, requireRole(['admin']), upload.single('imagen'), productUpdateValidator, validate, ctrl.update);
router.delete('/:id', authMiddleware, requireRole(['admin']), idParamValidator, validate, ctrl.remove);

module.exports = router;