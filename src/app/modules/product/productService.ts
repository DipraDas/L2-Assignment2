import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createNewProduct = async (productData: TProduct) => {
    const product = new Product(productData);
    const result = await product.save();
    return result;
}

const getAllProducts = async () => {
    const result = await Product.find();
    return result;
}

const getProductById = async (productId: string) => {
    const result = await Product.findById(productId);
    return result;
}

const updateProductById = async (productId: string, product: TProduct) => {
    const result = await Product.findByIdAndUpdate(productId, product, { new: true })
    return result;
}

export const ProductService = {
    createNewProduct,
    getAllProducts,
    getProductById,
    updateProductById
}