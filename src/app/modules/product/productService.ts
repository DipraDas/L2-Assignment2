import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createNewProduct = async (productData: TProduct) => {
    const product = new Product(productData);
    const result = await product.save();
    return result;
}

export const ProductService = {
    createNewProduct
}