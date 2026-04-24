import { Customer } from "../models/customer.model";

export const getCustomers = () => Customer.find();

export const createCustomer = (data: any) => Customer.create(data);

export const getCustomerById = (id: string) => Customer.findById(id);

export const updateCustomer = (id: string, data: any) =>
  Customer.findByIdAndUpdate(id, data, { new: true });

export const deleteCustomer = async (id: string) => {
  const deleted = await Customer.findByIdAndDelete(id);
  return !!deleted;
};