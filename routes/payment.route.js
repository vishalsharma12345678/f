import { Router } from "express";
import * as paymentController from '../controllers/payment.controller.js';

const router = Router();

router.post('/stripe', paymentController.initiateStripePayment);
router.get('/success', paymentController.showPaymentSuccess);
router.get('/cancel', paymentController.showPaymentCancel);

export default router;
