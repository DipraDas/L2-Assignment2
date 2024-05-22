import { Schema, model } from "mongoose";
import { TOrder } from "./order.interface";

const orderSchema = new Schema<TOrder>({
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    productId: {
        type: String,
        required: [true, 'Product ID is required'],
        match: [/^[0-9a-fA-F]{24}$/, 'Please provide a valid product ID'] // Ensures the productId is a valid ObjectId
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, 'Quantity must be at least 1'],
        validate: {
            validator: Number.isInteger,
            message: 'Quantity must be an integer'
        }
    }
});

export const Order = model<TOrder>('Order', orderSchema);
