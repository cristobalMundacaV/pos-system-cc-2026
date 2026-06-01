const router = require('express').Router();
const ctrl = require('../controllers/clientController');
const { authMiddleware } = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  idParamValidator,
  clientCreateValidator,
  clientUpdateValidator,
  searchValidator,
} = require('../validators');

router.get('/', authMiddleware, searchValidator, validate, ctrl.getAll);
router.get('/:id', authMiddleware, idParamValidator, validate, ctrl.getById);
router.post('/', authMiddleware, clientCreateValidator, validate, ctrl.create);
router.put('/:id', authMiddleware, clientUpdateValidator, validate, ctrl.update);
router.delete('/:id', authMiddleware, idParamValidator, validate, ctrl.remove);

module.exports = router;