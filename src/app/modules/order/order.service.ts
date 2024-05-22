import { IOrder } from "./order.interface";
import { Order } from "./order.model";

const createNewOrder = async (orderData: IOrder) => {
    const product = new Order(orderData);
    const result = await product.save();
    return result;
}

export const ProductService = {
    createNewOrder
}