import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
            required: [true, "Name is required!!!"],
        },
        description: {
            type: String,
            trim: true,
            required: [true, "Description is required!!!"],
        },
        price: {
            type: Number,
            required: [true, "Price is required!!!"],
            min: 0,
            default: 0,
            index: true,
        },
        image: {
            type: String, // cloudinary url
            required: true
        },
        stock: {
            type: Number,
            default: 0,
            required: true,
        },
        manufacturer: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category'
        },
        reviews: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Review'
            }
        ]
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

export default Product;