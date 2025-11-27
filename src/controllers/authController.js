// src/controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h'
  });
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email já cadastrado' });

    const user = new User({ name, email, password, role });
    await user.save();

    res.status(201).json({
      message: 'Usuário criado',
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token: generateToken(user)
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Credenciais inválidas' });

    const match = await user.matchPassword(password);
    if (!match) return res.status(401).json({ message: 'Credenciais inválidas' });

    res.status(200).json({
      message: 'Autenticado',
      token: generateToken(user),
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    next(err);
  }
};
