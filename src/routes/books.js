import express from 'express';
import { auth } from '../middlewares/auth.js';
import { adminMiddleware } from '../middlewares/admin.js';
import {
  listBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook
} from '../controllers/booksController.js';
const router = express.Router();

router.get('/', auth, listBooks);
router.get('/:id', auth, getBook);
router.post('/', auth, adminMiddleware, createBook);
router.patch('/:id', auth, adminMiddleware, updateBook);
router.delete('/:id', auth, adminMiddleware, deleteBook);
router.post('/:id/borrow', auth, borrowBook);
router.post('/:id/return', auth, returnBook);

export default router;
