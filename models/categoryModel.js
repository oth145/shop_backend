import mongoose from "mongoose";
// Define category schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: String,
    imageUrl: String,
    // Add more properties as needed
});

// Create category model
export  const Category = mongoose.model('Category', categorySchema);

