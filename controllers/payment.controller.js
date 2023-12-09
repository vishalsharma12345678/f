import Stripe from 'stripe';
import { User } from '../models/index.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const initiateStripePayment = async (req, res) => {
    try {
        const userId = res.locals.user._id;
        const user = await User.findById(userId).populate('cart.productId');
        const cart = user.cart;
        const totalPrice = cart.reduce((acc, item) => {
            return acc + item.productId.price * item.quantity;
        }, 0);

        // Add an item for the total price
        const lineItems = [
            ...cart.map(item => ({
                price_data: {
                    currency: 'INR',
                    product_data: {
                        name: item.productId.name,
                    },
                    unit_amount: item.productId.price,
                },
                quantity: item.quantity,
            })),
            // Item for total price
            {
                price_data: {
                    currency: 'INR',
                    product_data: {
                        name: 'Total Price',
                    },
                    unit_amount: totalPrice * 100, // Stripe expects the amount in cents
                },
                quantity: 1, // Assuming you want the total as a single item
            }
        ];

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: lineItems,
            success_url: `${process.env.CLIENT_URL}/success`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`,
        });

        res.json({ url: session.url });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const showPaymentSuccess = (req, res) => {
    res.render('payment/success');
};

export const showPaymentCancel = (req, res) => {
    res.render('payment/cancel');
};
