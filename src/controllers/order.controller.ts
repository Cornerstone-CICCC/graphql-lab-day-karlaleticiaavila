import { Order } from "../models/order.model";

export const getOrders = () => Order.find();

export const createOrder = (data: any) => Order.create(data);

export const getOrderById = (id: string) => Order.findById(id);

export const updateOrder = (id: string, data: any) =>
  Order.findByIdAndUpdate(id, data, { new: true });

export const deleteOrder = async (id: string) => {
  const deleted = await Order.findByIdAndDelete(id);
  return !!deleted;
};