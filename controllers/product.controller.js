import { Product } from '../models/index.js';
import { uploadImage } from '../utils/cloudinary.js';

export const getAllProducts = async (req, res) => {
    const allProducts = await Product.find({});
    res.render('products/allProducts', { Products: allProducts });
};

export const getCreateProductPage = async (req, res) => {
    res.render('products/createProduct');
};

export const createProduct = async (req, res) => {
    try {
        const image = await uploadImage(req.file.path);
        const { name, description, price, stock } = req.body;
        const manufacturer = res.locals.user._id;

        await Product.create({ name, description, price, image, stock, manufacturer });

        res.redirect('/');
    } catch (error) {
        // Handle error appropriately
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const showProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id).populate('reviews');
        res.render('products/showProduct', { product });
    } catch (error) {
        // Handle error appropriately
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
