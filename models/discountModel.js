import mongoose from "mongoose";

const discountSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  percentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
});

export const Discount = mongoose.model('Discount', discountSchema);


