import mongoose, {  Schema} from 'mongoose';
const productsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  
});

export const Product = mongoose.model('Product', productsSchema);