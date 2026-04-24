import { Customer } from '../models/customer.model';
import { Order } from '../models/order.model';
import { Product } from '../models/product.model';

export const resolvers = {
Query: {
  products: async () => await Product.find(),
  customers: async () => await Customer.find(),
  orders: async () => await Order.find(),

  getProductById: async (_: any, args: any) => await Product.findById(args.id),
  getCustomerById: async (_: any, args: any) => await Customer.findById(args.id),
},
  Product: {
    customers: async (parent: any) => {
      const orders = await Order.find({ productId: parent.id });
      const customerIds = orders.map((order: any) => order.customerId);
      return Customer.find({ _id: { $in: customerIds } });
    },
  },

  Customer: {
    products: async (parent: any) => {
      const orders = await Order.find({ customerId: parent.id });
      const productIds = orders.map((order: any) => order.productId);
      return Product.find({ _id: { $in: productIds } });
    },
  },

  Order: {
    product: (parent: any) => Product.findById(parent.productId),
    customer: (parent: any) => Customer.findById(parent.customerId),
  },

  Mutation: {
    addProduct: (_: any, args: any) =>
  Product.create({
    name: args.productName,
    price: args.productPrice,
  }),

    editProduct: (_: any, args: any) =>
      Product.findByIdAndUpdate(
        args.id,
        {
          productName: args.productName,
          productPrice: args.productPrice,
        },
        { new: true }
      ),

    removeProduct: async (_: any, args: any) => {
      const deleted = await Product.findByIdAndDelete(args.id);
      return !!deleted;
    },

    addCustomer: (_: any, args: any) =>
      Customer.create({
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
      }),

    editCustomer: (_: any, args: any) =>
      Customer.findByIdAndUpdate(
        args.id,
        {
          firstName: args.firstName,
          lastName: args.lastName,
          email: args.email,
        },
        { new: true }
      ),

    removeCustomer: async (_: any, args: any) => {
      const deleted = await Customer.findByIdAndDelete(args.id);
      return !!deleted;
    },

    addOrder: (_: any, args: any) =>
      Order.create({
        productId: args.productId,
        customerId: args.customerId,
      }),

    editOrder: (_: any, args: any) =>
      Order.findByIdAndUpdate(
        args.id,
        {
          productId: args.productId,
          customerId: args.customerId,
        },
        { new: true }
      ),

    removeOrder: async (_: any, args: any) => {
      const deleted = await Order.findByIdAndDelete(args.id);
      return !!deleted;
    },
  },
};