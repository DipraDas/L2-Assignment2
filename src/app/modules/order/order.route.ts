import express from 'express';
import { OrderController } from './order.controller';


const router = express.Router();

router.get('/', OrderController.getAllorders);
router.post('/', OrderController.createOrder);
router.get('/', OrderController.getAllorders);

export const OrderRoutes = router;