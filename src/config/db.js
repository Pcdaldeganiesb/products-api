const mongoose = require('mongoose');

const connectDB = async (mongoUri) => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB conectado');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error.message);
    throw error;
  }
};

module.exports = connectDB;
