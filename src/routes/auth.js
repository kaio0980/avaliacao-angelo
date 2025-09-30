import express from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password || password.length < 4) {
    return res.status(400).json({ message: 'Usuário e senha (mínimo 4 caracteres) obrigatórios.' });
  }
  const exists = await prisma.user.findUnique({ where: { username } });
  if (exists) {
    return res.status(400).json({ message: 'Usuário já existe.' });
  }
  
  const isFirst = (await prisma.user.count()) === 0;
  const user = await prisma.user.create({
    data: { username, password, isAdmin: isFirst },
  });
  res.status(201).json({ message: 'Usuário registrado', userId: user.id });
});

export default router;
