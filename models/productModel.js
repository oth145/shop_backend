import mongoose from "mongoose";

// Define product schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        ref: 'Category',
        required: true,
    },
    imageUrl: String,
    stock: {
        type: Number,
        default: 20 
    }
});
productSchema.virtual('categoryRef', {
    ref: 'Category',
    localField: 'category',
    foreignField: 'name',
    justOne: true // Set to true if each product belongs to only one category
});

// Populate the virtual field when querying products
productSchema.pre('find', function() {
    this.populate('categoryRef');
});
// Create product model
export const Product = mongoose.model('Product', productSchema);

