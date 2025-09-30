import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Usuários
  const users = [
    { username: 'admin', password: '1234', isAdmin: true },
    { username: 'user', password: '1234', isAdmin: false },
  ];
  for (const user of users) {
    const exists = await prisma.user.findUnique({ where: { username: user.username } });
    if (!exists) {
      await prisma.user.create({ data: user });
    }
  }
  // Livros
  const books = [
    { title: '1984', author: 'George Orwell', available: true },
    { title: 'Dom Casmurro', author: 'Machado de Assis', available: true },
    { title: 'Harry Potter', author: 'J.K. Rowling', available: false },
    { title: 'Clean Code', author: 'Robert Martin', available: true },
  ];
  for (const book of books) {
    const exists = await prisma.book.findFirst({ where: { title: book.title, author: book.author } });
    if (!exists) {
      await prisma.book.create({ data: book });
    }
  }
  console.log('Banco populado com sucesso!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
