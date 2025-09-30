# Projeto Biblioteca (API)

API REST para gerenciamento de livros de biblioteca com autenticação básica e diferenciação de permissões (usuário/admin).

## Como rodar

1. Instale as dependências:
   ```
npm install
   ```
2. Copie o arquivo `.env.example` para `.env` e ajuste se necessário.
3. Rode as migrations e popule o banco:
   ```
npx prisma migrate dev --name init
npx prisma db seed
   ```
4. Inicie o servidor:
   ```
npm run dev
   ```

## Rotas principais
- POST /auth/register
- GET /books
- POST /books/:id/borrow
- POST /books/:id/return
- (admin) POST, PATCH, DELETE /books

Veja o enunciado para detalhes.
