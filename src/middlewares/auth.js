import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function auth(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({ message: 'Token ausente ou inválido' });
  }
  const base64 = authHeader.split(' ')[1];
  const decoded = Buffer.from(base64, 'base64').toString('utf-8');
  const [username, password] = decoded.split(':');

  console.log('Decoded credentials:', username, password);
  if (!username || !password) {
    console.log('Decoded credentials:', { usernamequery: username, password: password ? '****' : null });
    return res.status(401).json({ message: 'Token inválido' });
  }
  const user = await prisma.user.findUnique({ where: { username: username } });
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Usuário ou senha inválidos' });
  }
  req.user = user;
  next();
}
