import React, { useState } from "react";

// Mock data for food items categorized by meal (replace with your database call)
const foodItems = {
  Breakfast: [
    { id: 1, name: "Oatmeal", calories: 150 },
    { id: 2, name: "Eggs", calories: 200 },
    { id: 3, name: "Fruit Smoothie", calories: 250 },
  ],
  Lunch: [
    { id: 4, name: "Chicken Breast", calories: 300 },
    { id: 5, name: "Rice", calories: 250 },
    { id: 6, name: "Broccoli", calories: 50 },
  ],
  Dinner: [
    { id: 7, name: "Salmon", calories: 350 },
    { id: 8, name: "Quinoa", calories: 222 },
    { id: 9, name: "Steamed Vegetables", calories: 100 },
  ],
  Snacks: [
    { id: 10, name: "Apple", calories: 95 },
    { id: 11, name: "Protein Bar", calories: 200 },
    { id: 12, name: "Yogurt", calories: 150 },
  ],
};

const FoodAttendance = ({ setCaloriesConsumed }) => {
  const [selectedFoods, setSelectedFoods] = useState([]);

  const handleFoodChange = (food) => {
    const updatedSelectedFoods = selectedFoods.includes(food.id)
      ? selectedFoods.filter((id) => id !== food.id)
      : [...selectedFoods, food.id];

    setSelectedFoods(updatedSelectedFoods);

    // Calculate total calories
    const totalCalories = updatedSelectedFoods.reduce((total, id) => {
      const foodItem = Object.values(foodItems)
        .flat()
        .find((item) => item.id === id);
      return total + (foodItem ? foodItem.calories : 0);
    }, 0);

    // Update calories consumed in the parent component
    setCaloriesConsumed(totalCalories);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
        Food Eaten Today
      </h3>

      {Object.entries(foodItems).map(([meal, foods]) => (
        <div key={meal} className="mb-6">
          <h4 className="text-xl font-semibold text-gray-700 mb-2 border-b pb-2">
            {meal}
          </h4>
          <ul className="space-y-4">
            {foods.map((food) => (
              <li
                key={food.id}
                className="flex items-center justify-between p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-300"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={food.id}
                    checked={selectedFoods.includes(food.id)}
                    onChange={() => handleFoodChange(food)}
                    className="mr-3 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor={food.id} className="text-gray-800">
                    {food.name}
                  </label>
                </div>
                <span className="text-gray-600">{food.calories} kcal</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FoodAttendance;
