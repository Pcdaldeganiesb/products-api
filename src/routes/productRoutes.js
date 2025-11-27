/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Endpoints de produtos
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Listar todos os produtos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de produtos retornada com sucesso
 *
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Criar novo produto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Produto criado
 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Buscar produto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto encontrado
 *       404:
 *         description: Produto não encontrado
 *
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Atualizar produto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Produto atualizado
 *       404:
 *         description: Produto não encontrado
 *
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Remover produto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto removido
 *       404:
 *         description: Produto não encontrado
 */

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const handleValidation = require('../middlewares/handleValidation');
const { createProductValidation, updateProductValidation, idValidation } = require('../validations/productValidation');

// read (GET) - public
router.get('/', productController.getProducts);
router.get('/:id', idValidation, handleValidation, productController.getProductById);

// write routes - protected
router.post('/', authMiddleware, createProductValidation, handleValidation, productController.createProduct);
router.put('/:id', authMiddleware, updateProductValidation, handleValidation, productController.updateProduct);
router.delete('/:id', authMiddleware, idValidation, handleValidation, productController.deleteProduct);

module.exports = router;
