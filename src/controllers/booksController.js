import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function listBooks(req, res) {
  const books = await prisma.book.findMany();

  console.log('Books:', books);
  res.json(books);
}

export async function getBook(req, res) {
  const book = await prisma.book.findUnique({ where: { id: Number(req.params.id) } });
  if (!book) return res.status(404).json({ message: 'Livro não encontrado' });
  res.json(book);
}

export async function createBook(req, res) {
  const { title, author } = req.body;
  if (!title || !author) return res.status(400).json({ message: 'Título e autor obrigatórios.' });
  const book = await prisma.book.create({ data: { title, author } });
  res.status(201).json({ message: 'Livro criado', book });
}

export async function updateBook(req, res) {
  const { title, author, available } = req.body;
  const data = {};
  if (title) data.title = title;
  if (author) data.author = author;
  if (available !== undefined) data.available = available;
  try {
    const book = await prisma.book.update({ where: { id: Number(req.params.id) }, data });
    res.json({ message: 'Livro atualizado', book });
  } catch {
    res.status(404).json({ message: 'Livro não encontrado' });
  }
}

export async function deleteBook(req, res) {
  try {
    await prisma.book.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: 'Livro removido' });
  } catch {
    res.status(404).json({ message: 'Livro não encontrado' });
  }
}

export async function borrowBook(req, res) {
  const book = await prisma.book.findUnique({ where: { id: Number(req.params.id) } });
  if (!book) return res.status(404).json({ message: 'Livro não encontrado' });
  if (!book.available) return res.status(400).json({ message: 'Livro indisponível' });
  await prisma.book.update({ where: { id: book.id }, data: { available: false } });
  res.json({ message: 'Livro emprestado com sucesso' });
}

export async function returnBook(req, res) {
  const book = await prisma.book.findUnique({ where: { id: Number(req.params.id) } });
  if (!book) return res.status(404).json({ message: 'Livro não encontrado' });
  if (book.available) return res.status(400).json({ message: 'Livro já está disponível' });
  await prisma.book.update({ where: { id: book.id }, data: { available: true } });
  res.json({ message: 'Livro devolvido com sucesso' });
}
