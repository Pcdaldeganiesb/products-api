// src/models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 200 },
  description: { type: String, trim: true, maxlength: 2000 },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, default: 0, min: 0 },
  category: { type: String, trim: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
