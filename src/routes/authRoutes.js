/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de autenticação
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegister'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       409:
 *         description: Email já registrado
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Fazer login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const handleValidation = require('../middlewares/handleValidation');
const authController = require('../controllers/authController');

router.post('/register',
  [
    body('name').isString().notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
  ],
  handleValidation,
  authController.register
);

router.post('/login',
  [
    body('email').isEmail(),
    body('password').isString().notEmpty()
  ],
  handleValidation,
  authController.login
);

module.exports = router;
