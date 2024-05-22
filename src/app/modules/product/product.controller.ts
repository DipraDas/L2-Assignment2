import { Request, Response } from "express";
import { ProductService } from "./productService";

const createProduct = async (req: Request, res: Response) => {
    try {
        const product = req.body;
        const result = await ProductService.createNewProduct(product);
        res.status(200).json({
            success: true,
            message: 'Product created successfully!',
            data: result
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export const ProductController = {
    createProduct
}