import { Product } from "../models/product.model";

export const getProducts = () => Product.find();

export const createProduct = (data: any) => Product.create(data);

export const getProductById = (id: string) => Product.findById(id);

export const updateProduct = (id: string, data: any) =>
  Product.findByIdAndUpdate(id, data, { new: true });

export const deleteProduct = async (id: string) => {
  const deleted = await Product.findByIdAndDelete(id);
  return !!deleted;
};