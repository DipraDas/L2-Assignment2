import { z } from "zod";

const productVariantSchema = z.object({
    type: z.string().nonempty({ message: 'Product Type is required' }),
    value: z.string().nonempty({ message: 'Product Value is required' })
});

const productInventorySchema = z.object({
    quantity: z.number().int().nonnegative({ message: 'Product Quantity must be a non-negative integer' }),
    inStock: z.boolean({ required_error: 'Instock Status is required' })
});

const productValidationSchema = z.object({
    name: z.string().nonempty({ message: 'Product Name is required' }),
    description: z.string().nonempty({ message: 'Product Description is required' }),
    price: z.number().positive({ message: 'Product Price must be a positive number' }),
    category: z.string().nonempty({ message: 'Product Category is required' }),
    tags: z.array(z.string().nonempty({ message: 'Each tag must be a non-empty string' })).nonempty({ message: 'Product Tags are required' }),
    variants: z.array(productVariantSchema).nonempty({ message: 'Product Variants are required' }),
    inventory: productInventorySchema
});

export default productValidationSchema;