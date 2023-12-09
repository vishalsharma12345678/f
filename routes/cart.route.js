import { Router } from 'express';
import * as cartController from '../controllers/cart.controller.js';

const router = Router();

router.get('/', cartController.showUserCart);
router.post('/add', cartController.addToCart);
router.post('/:productId/increase', cartController.increaseQuantity);
router.post('/:productId/decrease', cartController.decreaseQuantity);
router.delete('/:id/delete', cartController.deleteProductFromCart);
router.get('/clear-cart', cartController.clearCart);

export default router;
