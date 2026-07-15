import { Router } from 'express';
import { createOrder, getOrders } from '../controllers/ordersController';
import { protect } from '../middleware/auth';

const router = Router();

router.use(protect);

router.post('/', createOrder);
router.get('/', getOrders);

export default router;
