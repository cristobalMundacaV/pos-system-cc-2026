const router = require('express').Router();
const { body, param, validationResult } = require('express-validator');
const ctrl = require('../controllers/clientController');
const { authMiddleware } = require('../middleware/auth');

// Función para validar RUT chileno
const validateRUT = (rut) => {
  const cleanRut = rut.replace(/[.-]/g, '');
  const body = cleanRut.slice(0, -1);
  const digit = cleanRut.slice(-1).toUpperCase();
  
  if (!/^[0-9]+$/.test(body)) return false;
  
  let sum = 0;
  let multiplier = 2;
  
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }
  
  const expectedDigit = (11 - (sum % 11)) % 11;
  const expectedDigitStr = expectedDigit === 10 ? 'K' : String(expectedDigit);
  
  return digit === expectedDigitStr;
};

// Middleware para manejar errores de validación
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// ✅ SEGURIDAD: Validación para crear cliente
const validateClientCreate = [
  body('rut')
    .trim()
    .notEmpty()
    .withMessage('RUT es requerido')
    .custom(validateRUT)
    .withMessage('RUT chileno inválido'),
  body('nombre')
    .trim()
    .notEmpty()
    .withMessage('Nombre es requerido')
    .isLength({ min: 2, max: 100 })
    .withMessage('Nombre debe tener entre 2 y 100 caracteres'),
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Email debe ser válido'),
  body('telefono')
    .optional()
    .trim()
    .matches(/^[0-9+\-\s()]*$/)
    .withMessage('Teléfono tiene formato inválido'),
  body('direccion')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('Dirección no puede exceder 255 caracteres')
];

// ✅ SEGURIDAD: Validación para actualizar cliente
const validateClientUpdate = [
  param('id')
    .isInt()
    .withMessage('ID de cliente inválido'),
  body('nombre')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Nombre debe tener entre 2 y 100 caracteres'),
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Email debe ser válido'),
  body('telefono')
    .optional()
    .trim()
    .matches(/^[0-9+\-\s()]*$/)
    .withMessage('Teléfono tiene formato inválido'),
  body('direccion')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('Dirección no puede exceder 255 caracteres')
];

// ✅ SEGURIDAD: Validación para ID
const validateId = [
  param('id')
    .isInt()
    .withMessage('ID inválido')
];

router.get('/',       authMiddleware, ctrl.getAll);
router.get('/:id',    authMiddleware, validateId, handleValidationErrors, ctrl.getById);
router.post('/',      authMiddleware, validateClientCreate, handleValidationErrors, ctrl.create);
router.put('/:id',    authMiddleware, validateClientUpdate, handleValidationErrors, ctrl.update);
router.delete('/:id', authMiddleware, validateId, handleValidationErrors, ctrl.remove);

module.exports = router;
