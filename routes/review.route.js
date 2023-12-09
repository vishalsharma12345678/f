import { Router } from 'express';
import { authenticate } from '../middlewares/index.js';
import * as reviewController from '../controllers/review.controller.js';

const router = new Router();

// Route: Add a new review to a product
router.post('/:id', authenticate, reviewController.addReview);

// Route: Delete a review from a product
router.delete('/:id/delete/:reviewId', authenticate, reviewController.deleteReview);

export default router;
