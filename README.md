API – Autenticação + Produtos

Esta é uma API Node.js com Express, incluindo autenticação com JWT e operações CRUD de produtos.
Documentação disponível via Swagger.

Tecnologias utilizadas

Node.js

Express

MongoDB + Mongoose

JWT

Bcrypt

Swagger UI

Instalação
npm install

Configuração

Crie um arquivo .env na raiz:

PORT=3000
MONGO_URI=mongodb://localhost:27017/seu_banco
JWT_SECRET=algumseguroaqui

Executar servidor
npm run dev


Servidor inicia em:
http://localhost:3000

Documentação (Swagger)

Acesse:

http://localhost:3000/api-docs

Rotas de Autenticação
POST /api/auth/register

Cria um usuário novo.
Body:

{
  "name": "Exemplo",
  "email": "exemplo@email.com",
  "password": "123456"
}

POST /api/auth/login

Retorna token JWT.
Body:

{
  "email": "exemplo@email.com",
  "password": "123456"
}


Resposta:

{
  "token": "..."
}

Rotas de Produtos (requer token)

Header obrigatório:

Authorization: Bearer SEU_TOKEN

GET /api/products

Lista produtos.

GET /api/products/:id

Retorna um produto.

POST /api/products

Body:

{
  "name": "Produto XPTO",
  "price": 199.90
}

PUT /api/products/:id

Body:

{
  "name": "Novo nome",
  "price": 250
}

DELETE /api/products/:id

Remove o produto.

Estrutura recomendada
project/
│   server.js
│   swagger.json
│   .env
│   package.json
│
├───routes
│       authRoutes.js
│       productRoutes.js
│
├───controllers
│       authController.js
│       productController.js
│
├───models
│       User.js
│       Product.js
│
└───middleware
        authMiddleware.js

Testes

Testar via:

Thunder Client

Insomnia

Postman

Swagger UI

Status

API funcional com autenticação, CRUD e documentação.