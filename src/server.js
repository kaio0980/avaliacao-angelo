import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import booksRoutes from './routes/books.js';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/books', booksRoutes);

app.use((req, res) => { 
  res.status(404).json({ message: 'Rota não encontrada' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
