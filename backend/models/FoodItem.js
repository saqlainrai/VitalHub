const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema({
  day: { type: String, required: true },
  mealType: { type: String, required: true },
  name: { type: [String], required: true }, // Changed to array of strings
  calories: { type: Number, required: true },
  fats: { type: Number, required: true },
  protein: { type: Number, required: true },
  sugars: { type: Number, required: true },
});

module.exports = mongoose.model("FoodItem", foodItemSchema);
