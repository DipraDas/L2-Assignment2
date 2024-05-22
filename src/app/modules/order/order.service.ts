import { Product } from "../product/product.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrderIntoDB = async (orderdata: TOrder) => {
    const { productId, quantity } = orderdata;

    // Get the product's inventory
    const product = await Product.findById(productId);
    if (!product) {
        throw new Error("Product not found");
    }

    // Check if the ordered quantity exceeds the available quantity
    if (quantity > product.inventory.quantity) {
        throw new Error("Insufficient stock");
    }

    // Update the inventory quantity and inStock status
    const updatedQuantity = product.inventory.quantity - quantity;
    const updatedInStock = updatedQuantity > 0;
    await Product.findByIdAndUpdate(productId, {
        inventory: {
            quantity: updatedQuantity,
            inStock: updatedInStock,
        },
    });

    const result = await Order.create(orderdata);
    return result;
};

const getAllOrdersFromDB = async (email?: string) => {
    if (email) {
        const result = await Order.find({ email });
        return result;
    } else {
        const result = await Order.find();
        return result;
    }
};

export const OrderServices = {
    createOrderIntoDB,
    getAllOrdersFromDB,
};