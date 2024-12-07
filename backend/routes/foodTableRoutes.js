const express = require("express");
const FoodItem = require("../models/FoodItem");

const router = express.Router();

// Allowed days of the week
const validDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

router.post("/add-food", async (req, res) => {
  const { day, mealType, name, calories, fats, protein, sugars } = req.body;

  try {
    // Validate if day is valid
    if (!validDays.includes(day)) {
      return res.status(400).json({
        error: "Invalid day. Only Monday through Sunday are allowed.",
      });
    }

    // Check if a mealType already exists for the given day
    const existingMeal = await FoodItem.findOne({ day, mealType });
    if (existingMeal) {
      return res.status(400).json({
        error: "A meal with this type already exists for the given day.",
      });
    }

    // Ensure 'name' is an array and validate
    if (!Array.isArray(name) || name.length === 0) {
      return res.status(400).json({
        error: "The name field must be a non-empty array of strings.",
      });
    }

    // Create a new food item
    const foodItem = new FoodItem({
      day,
      mealType,
      name,
      calories,
      fats,
      protein,
      sugars,
    });

    await foodItem.save();
    res.status(201).json({
      message: "Food item added successfully",
      data: foodItem,
    });
  } catch (error) {
    console.error("Error saving food item:", error);
    res.status(500).json({
      error: "Failed to save food item.",
    });
  }
});

// Route to get all food items
router.get("/get-food", async (req, res) => {
  try {
    const foodItems = await FoodItem.find();
    res.status(200).json(foodItems);
  } catch (error) {
    console.error("Error fetching food items:", error);
    res.status(500).json({ error: "Failed to fetch food items." });
  }
});

// Route to delete a specific food item by id
router.delete("/remove-food/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await FoodItem.findByIdAndDelete(id);
    res.status(200).json({
      message: "Food item deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting food item:", error);
    res.status(500).json({ error: "Failed to delete food item." });
  }
});

// Route to update allowed fields while keeping day and mealType unchanged
router.put("/update-food/:id", async (req, res) => {
  const { id } = req.params;
  const { name, calories, fats, protein, sugars } = req.body;

  try {
    // Fetch the food item by ID
    const foodItem = await FoodItem.findById(id);

    if (!foodItem) {
      return res.status(404).json({
        error: "Food item not found.",
      });
    }

    // Update only allowed fields
    if (name) {
      if (!Array.isArray(name) || name.length === 0) {
        return res.status(400).json({
          error: "The name field must be a non-empty array of strings.",
        });
      }
      foodItem.name = name;
    }
    if (calories) foodItem.calories = calories;
    if (fats) foodItem.fats = fats;
    if (protein) foodItem.protein = protein;
    if (sugars) foodItem.sugars = sugars;

    const updatedFoodItem = await foodItem.save();
    res.status(200).json({
      message: "Food item updated successfully",
      data: updatedFoodItem,
    });
  } catch (error) {
    console.error("Error updating food item:", error);
    res.status(500).json({
      error: "Failed to update food item.",
    });
  }
});

module.exports = router;
