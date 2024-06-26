/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response } from "express";
import { ProductService } from "./product.service";
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
    catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
            error: error,
        });
    }
}

const getAllProducts = async (req: Request, res: Response) => {
    try {
        const { searchTerm } = req.query;

        const result = await ProductService.getAllProducts(searchTerm as string);

        if (searchTerm && result.length === 0) {
            res.status(200).json({
                success: false,
                message: `No products found with the term '${searchTerm}'`,
                data: null,
            });
        } else {
            res.status(200).json({
                success: true,
                message: searchTerm
                    ? `Products matching search term '${searchTerm}' fetched successfully!`
                    : "Products fetched successfully!",
                data: result,
            });
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
            error: error,
        });
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
    }
    catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
            error: error,
        });
    }
}

const updateProductById = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const productData = req.body;
        const zodParsedData = productValidationSchema.parse(productData);

        const result = await ProductService.updateProductById(productId, zodParsedData);

        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product updated successfully!',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error
        });
    }
}

const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const result = await ProductService.deleteProductById(productId);

        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully!',
            data: null
        });
    }
    catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
            error: error,
        });
    }
}

export const ProductController = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProduct
}