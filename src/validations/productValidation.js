// src/validations/productValidation.js
const { body, param, query } = require('express-validator');

const createProductValidation = [
  body('name').isString().trim().notEmpty().withMessage('name é obrigatório'),
  body('price').isFloat({ gt: -1 }).withMessage('price deve ser número >= 0'),
  body('stock').optional().isInt({ min: 0 }).withMessage('stock deve ser inteiro >=0'),
];

const updateProductValidation = [
  param('id').isMongoId().withMessage('id inválido'),
  body('price').optional().isFloat({ gt: -1 }),
  body('stock').optional().isInt({ min: 0 })
];

const idValidation = [
  param('id').isMongoId().withMessage('id inválido')
];

module.exports = {
  createProductValidation,
  updateProductValidation,
  idValidation
};
