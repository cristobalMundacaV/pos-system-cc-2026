const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { login, me } = require('../controllers/authController');
const { authMiddleware } = require('../middleware/auth');

// ✅ SEGURIDAD: Middleware de validación para login
const validateLogin = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Email debe ser válido'),
  body('password')
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage('Contraseña debe tener al menos 6 caracteres')
];

// Middleware para manejar errores de validación
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post('/login', validateLogin, handleValidationErrors, login);
router.get('/me', authMiddleware, me);

module.exports = router;
