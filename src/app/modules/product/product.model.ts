import { Schema, model } from "mongoose";
import { TInventory, TProduct, TProductVariant } from "./product.interface";

const productVariantSchema = new Schema<TProductVariant>({
    type: {
        type: String,
        required: [true, 'Product Type is required']
    },
    value: {
        type: String,
        required: [true, 'Product Value is required']
    }
})

const productInventorySchema = new Schema<TInventory>({
    quantity: {
        type: Number,
        required: [true, 'Product Quantity is required']
    },
    inStock: {
        type: Boolean,
        required: [true, 'Instock Status is required']
    }
})

const productSchema = new Schema<TProduct>({
    name: {
        type: String,
        required: [true, 'Product Name is required']
    },
    description: {
        type: String,
        required: [true, 'Product Description is required']
    },
    price: {
        type: Number,
        required: [true, 'Product Price is required']
    },
    category: {
        type: String,
        required: [true, 'Product Category is required']
    },
    tags: {
        type: [String],
        required: [true, 'Product Tags are required']
    },
    variants: [productVariantSchema],
    inventory: productInventorySchema
})


export const Product = model<TProduct>('Product', productSchema);