import {Router} from 'express'
import { createTransaction, getTransaction, deleteTransaction } from '../controllers/transaction.controller.mjs';

const router = Router();

router.post('/', createTransaction);
router.get('/:id',getTransaction );
router.delete('/:id', deleteTransaction);

export default router