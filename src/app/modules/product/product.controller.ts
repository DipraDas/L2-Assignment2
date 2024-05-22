import { Request, Response } from "express";
import { ProductService } from "./productService";
import productValidationSchema from "./product.validation";

const createProduct = async (req: Request, res: Response) => {
    try {
        const product = req.body;
        const zodParsedData = productValidationSchema.parse(product);
        const result = await ProductService.createNewProduct(zodParsedData);

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

const getAllProducts = async (req: Request, res: Response) => {
    try {
        const result = await ProductService.getAllProducts();
        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: result,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
};

const getProductById = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const result = await ProductService.getProductById(productId);

        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product fetched successfully!',
            data: result
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export const ProductController = {
    createProduct,
    getAllProducts,
    getProductById
}