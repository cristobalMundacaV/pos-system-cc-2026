const router = require('express').Router();
const { login, me } = require('../controllers/authController');
const { authMiddleware } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { loginValidator } = require('../validators');

router.post('/login', loginValidator, validate, login);
router.get('/me', authMiddleware, me);

module.exports = router;