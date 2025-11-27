// src/controllers/productController.js
const Product = require('../models/Product');

exports.createProduct = async (req, res, next) => {
  try {
    const p = new Product(req.body);
    const saved = await p.save();
    res.status(201).json({ message: 'Produto criado', product: saved });
  } catch (err) { next(err); }
};

exports.getProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const products = await Product.find().skip(skip).limit(Number(limit));
    const total = await Product.countDocuments();
    res.status(200).json({ total, page: Number(page), limit: Number(limit), products });
  } catch (err) { next(err); }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produto não encontrado' });
    res.status(200).json(product);
  } catch (err) { next(err); }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Produto não encontrado' });
    res.status(200).json({ message: 'Produto atualizado', product: updated });
  } catch (err) { next(err); }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Produto não encontrado' });
    res.status(200).json({ message: 'Produto removido' });
  } catch (err) { next(err); }
};
