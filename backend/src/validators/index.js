const { body, param, query } = require('express-validator');

const idParamValidator = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('El ID debe ser un número entero válido.'),
];

const loginValidator = [
  body('email')
    .trim()
    .notEmpty().withMessage('El email es obligatorio.')
    .isEmail().withMessage('El email no tiene un formato válido.')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria.')
    .isLength({ min: 4 }).withMessage('La contraseña debe tener al menos 4 caracteres.'),
];

const productCreateValidator = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre del producto es obligatorio.')
    .isLength({ max: 200 }).withMessage('El nombre no puede superar los 200 caracteres.'),

  body('descripcion')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 1000 }).withMessage('La descripción no puede superar los 1000 caracteres.'),

  body('precio')
    .notEmpty().withMessage('El precio es obligatorio.')
    .isInt({ min: 0 }).withMessage('El precio debe ser un número entero mayor o igual a 0.'),

  body('stock')
    .optional({ nullable: true, checkFalsy: true })
    .isInt({ min: 0 }).withMessage('El stock debe ser un número entero mayor o igual a 0.'),

  body('categoria_id')
    .optional({ nullable: true, checkFalsy: true })
    .isInt({ min: 1 }).withMessage('La categoría debe ser válida.'),
];

const productUpdateValidator = [
  ...idParamValidator,

  body('nombre')
    .optional()
    .trim()
    .notEmpty().withMessage('El nombre no puede estar vacío.')
    .isLength({ max: 200 }).withMessage('El nombre no puede superar los 200 caracteres.'),

  body('descripcion')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 1000 }).withMessage('La descripción no puede superar los 1000 caracteres.'),

  body('precio')
    .optional()
    .isInt({ min: 0 }).withMessage('El precio debe ser un número entero mayor o igual a 0.'),

  body('stock')
    .optional()
    .isInt({ min: 0 }).withMessage('El stock debe ser un número entero mayor o igual a 0.'),

  body('categoria_id')
    .optional({ nullable: true, checkFalsy: true })
    .isInt({ min: 1 }).withMessage('La categoría debe ser válida.'),

  body('activo')
    .optional()
    .isBoolean().withMessage('El estado activo debe ser true o false.'),
];

const categoryCreateValidator = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre de la categoría es obligatorio.')
    .isLength({ max: 100 }).withMessage('El nombre no puede superar los 100 caracteres.'),

  body('descripcion')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 1000 }).withMessage('La descripción no puede superar los 1000 caracteres.'),
];

const categoryUpdateValidator = [
  ...idParamValidator,

  body('nombre')
    .optional()
    .trim()
    .notEmpty().withMessage('El nombre no puede estar vacío.')
    .isLength({ max: 100 }).withMessage('El nombre no puede superar los 100 caracteres.'),

  body('descripcion')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 1000 }).withMessage('La descripción no puede superar los 1000 caracteres.'),
];

const clientCreateValidator = [
  body('rut')
    .trim()
    .notEmpty().withMessage('El RUT es obligatorio.')
    .matches(/^\d{7,8}-[\dkK]$/).withMessage('El RUT debe tener formato 12345678-9.'),

  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre del cliente es obligatorio.')
    .isLength({ max: 150 }).withMessage('El nombre no puede superar los 150 caracteres.'),

  body('email')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isEmail().withMessage('El email no tiene un formato válido.')
    .normalizeEmail(),

  body('telefono')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 20 }).withMessage('El teléfono no puede superar los 20 caracteres.'),

  body('direccion')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 500 }).withMessage('La dirección no puede superar los 500 caracteres.'),
];

const clientUpdateValidator = [
  ...idParamValidator,

  body('rut')
    .optional()
    .trim()
    .matches(/^\d{7,8}-[\dkK]$/).withMessage('El RUT debe tener formato 12345678-9.'),

  body('nombre')
    .optional()
    .trim()
    .notEmpty().withMessage('El nombre no puede estar vacío.')
    .isLength({ max: 150 }).withMessage('El nombre no puede superar los 150 caracteres.'),

  body('email')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isEmail().withMessage('El email no tiene un formato válido.')
    .normalizeEmail(),

  body('telefono')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 20 }).withMessage('El teléfono no puede superar los 20 caracteres.'),

  body('direccion')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 500 }).withMessage('La dirección no puede superar los 500 caracteres.'),
];

const saleCreateValidator = [
  body('cliente_id')
    .optional({ nullable: true, checkFalsy: true })
    .isInt({ min: 1 }).withMessage('El cliente debe ser válido.'),

  body('metodo_pago')
    .optional()
    .isIn(['efectivo', 'debito', 'credito', 'transferencia'])
    .withMessage('El método de pago debe ser efectivo, debito, credito o transferencia.'),

  body('notas')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 1000 }).withMessage('Las notas no pueden superar los 1000 caracteres.'),

  body('items')
    .isArray({ min: 1 }).withMessage('La venta debe tener al menos un producto.'),

  body('items.*.producto_id')
    .isInt({ min: 1 }).withMessage('Cada producto debe tener un ID válido.'),

  body('items.*.cantidad')
    .isInt({ min: 1 }).withMessage('La cantidad debe ser mayor a 0.'),

  body('items.*.precio_unitario')
    .isInt({ min: 0 }).withMessage('El precio unitario debe ser mayor o igual a 0.'),
];

const userCreateValidator = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre del usuario es obligatorio.')
    .isLength({ max: 100 }).withMessage('El nombre no puede superar los 100 caracteres.'),

  body('email')
    .trim()
    .notEmpty().withMessage('El email es obligatorio.')
    .isEmail().withMessage('El email no tiene un formato válido.')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria.')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),

  body('rol_id')
    .isInt({ min: 1 }).withMessage('El rol debe ser válido.'),
];

const userUpdateValidator = [
  ...idParamValidator,

  body('nombre')
    .optional()
    .trim()
    .notEmpty().withMessage('El nombre no puede estar vacío.')
    .isLength({ max: 100 }).withMessage('El nombre no puede superar los 100 caracteres.'),

  body('email')
    .optional()
    .trim()
    .isEmail().withMessage('El email no tiene un formato válido.')
    .normalizeEmail(),

  body('password')
    .optional({ nullable: true, checkFalsy: true })
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),

  body('rol_id')
    .optional()
    .isInt({ min: 1 }).withMessage('El rol debe ser válido.'),

  body('activo')
    .optional()
    .isBoolean().withMessage('El estado activo debe ser true o false.'),
];

const searchValidator = [
  query('search')
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ max: 100 }).withMessage('La búsqueda no puede superar los 100 caracteres.'),
];

module.exports = {
  idParamValidator,
  loginValidator,
  productCreateValidator,
  productUpdateValidator,
  categoryCreateValidator,
  categoryUpdateValidator,
  clientCreateValidator,
  clientUpdateValidator,
  saleCreateValidator,
  userCreateValidator,
  userUpdateValidator,
  searchValidator,
};