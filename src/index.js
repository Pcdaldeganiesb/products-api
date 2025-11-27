const express = require('express');
const app = express();
const connectDB = require('./config/db');

require('dotenv').config();

app.use(express.json());

// SWAGGER (definido antes das rotas para evitar conflitos e garantir carregamento)
const { swaggerUi, swaggerSpec } = require('./docs/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ROTAS
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/products', require('./routes/productRoutes'));

const PORT = process.env.PORT || 3000;

// Conecta ao MongoDB antes de iniciar o servidor
connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco:", err);
  });

module.exports = app;
