const router = require('express').Router();
const { body, param, validationResult } = require('express-validator');
const ctrl = require('../controllers/productController');
const { authMiddleware, requireRole } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Middleware para manejar errores de validación
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// ✅ SEGURIDAD: Validación para crear producto
const validateProductCreate = [
  body('nombre')
    .trim()
    .notEmpty()
    .withMessage('Nombre del producto es requerido')
    .isLength({ min: 2, max: 200 })
    .withMessage('Nombre debe tener entre 2 y 200 caracteres'),
  body('precio')
    .isFloat({ min: 0 })
    .withMessage('Precio debe ser un número positivo'),
  body('stock')
    .isInt({ min: 0 })
    .withMessage('Stock debe ser un número entero no negativo'),
  body('categoria_id')
    .optional()
    .isInt()
    .withMessage('Categoría debe ser un número válido'),
  body('descripcion')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Descripción no puede exceder 1000 caracteres')
];

// ✅ SEGURIDAD: Validación para actualizar producto
const validateProductUpdate = [
  param('id')
    .isInt()
    .withMessage('ID de producto inválido'),
  body('nombre')
    .optional()
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage('Nombre debe tener entre 2 y 200 caracteres'),
  body('precio')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Precio debe ser un número positivo'),
  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Stock debe ser un número entero no negativo'),
  body('categoria_id')
    .optional()
    .isInt()
    .withMessage('Categoría debe ser un número válido')
];

// ✅ SEGURIDAD: Validación para ID
const validateId = [
  param('id')
    .isInt()
    .withMessage('ID inválido')
];

router.get('/',    authMiddleware, ctrl.getAll);
router.get('/:id', authMiddleware, validateId, handleValidationErrors, ctrl.getById);
router.post('/',   authMiddleware, requireRole(['admin']), upload.single('imagen'), validateProductCreate, handleValidationErrors, ctrl.create);
router.put('/:id', authMiddleware, requireRole(['admin']), upload.single('imagen'), validateProductUpdate, handleValidationErrors, ctrl.update);
router.delete('/:id', authMiddleware, requireRole(['admin']), validateId, handleValidationErrors, ctrl.remove);

module.exports = router;
