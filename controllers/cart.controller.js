import { User } from '../models/index.js';

export const showUserCart = async (req, res) => {
    try {
        const userId = res.locals.user._id;
        const user = await User.findById(userId).populate('cart.productId');
        const cart = user.cart;
        const totalPrice = cart.reduce((acc, item) => {
            return acc + item.productId.price * item.quantity;
        }, 0);
        res.render('cart/userCart', { cart, total: totalPrice });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const addToCart = async (req, res) => {
    try {
        const { quantity, productId } = req.body;
        const userId = res.locals.user._id;
        const user = await User.findById(userId);
        const product = user.cart.find(product => product.productId == productId);
        if (product) {
            product.quantity += quantity;
        } else {
            user.cart.push({ productId, quantity });
        }
        await user.save();
        res.status(200).send({ message: 'ok' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const increaseQuantity = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = res.locals.user._id;
        const user = await User.findById(userId);
        const product = user.cart.find(product => product.productId == productId);
        if (product) {
            product.quantity += 1;
        }
        await user.save();
        res.redirect('/cart');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const decreaseQuantity = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = res.locals.user._id;
        const user = await User.findById(userId);
        const product = user.cart.find(product => product.productId == productId);
        if (product) {
            product.quantity -= 1;
        }
        await user.save();
        res.redirect('/cart');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const deleteProductFromCart = async (req, res) => {
    try {
        const { id: productId } = req.params;
        const userId = res.locals.user._id;
        const user = await User.findById(userId);
        const product = user.cart.find(product => product.productId == productId);
        if (product) {
            user.cart = user.cart.filter(product => product.productId != productId);
        }
        await user.save();
        res.redirect('/cart');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const clearCart = async (req, res) => {
    try {
        const userId = res.locals.user._id;
        const user = await User.findById(userId);
        user.cart = [];
        await user.save();
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
