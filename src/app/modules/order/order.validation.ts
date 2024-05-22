import { z } from "zod";

const orderValidationSchema = z.object({
    email: z.string().email({ message: 'Please fill a valid email address' }),
    productId: z.string().regex(/^[0-9a-fA-F]{24}$/, { message: 'Please provide a valid product ID' }),
    price: z.number().min(0, { message: 'Price must be a positive number' }),
    quantity: z.number().int().min(1, { message: 'Quantity must be at least 1' })
});

export default orderValidationSchema;
