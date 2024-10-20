import React, { useState } from "react";

// Mock data for food items (replace with your database call)
const initialFoodData = {
  Monday: {
    breakfast: [
      { id: 1, name: "Oatmeal", calories: 150, fats: 3, protein: 5, sugars: 1 },
      { id: 2, name: "Eggs", calories: 200, fats: 5, protein: 12, sugars: 0 },
    ],
    lunch: [
      {
        id: 3,
        name: "Chicken Breast",
        calories: 300,
        fats: 10,
        protein: 25,
        sugars: 0,
      },
    ],
    dinner: [],
    snacks: [],
  },
  Tuesday: {
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
  },
  Wednesday: {},
  Thursday: {},
  Friday: {},
  Saturday: {},
  Sunday: {},
};

const FoodTimeTable = () => {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [foodData, setFoodData] = useState(initialFoodData);

  const handleDayChange = (day) => {
    setSelectedDay(day);
  };

  const removeFoodItem = (mealType, id) => {
    const updatedMeals = foodData[selectedDay][mealType].filter(
      (item) => item.id !== id
    );
    setFoodData((prevData) => ({
      ...prevData,
      [selectedDay]: {
        ...prevData[selectedDay],
        [mealType]: updatedMeals,
      },
    }));
  };

  const addFoodItem = (mealType) => {
    // Logic to add food items can be implemented here
    // For now, we'll just log to the console
    console.log(`Add food item to ${mealType} for ${selectedDay}`);
  };

  const renderMealSection = (mealType, mealName) => (
    <div className="mt-6">
      <h4 className="text-lg font-semibold text-gray-800 mb-2">{mealName}</h4>
      <table className="min-w-full border border-gray-300 mb-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Food</th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Calories
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Fats (g)
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Protein (g)
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Sugars (g)
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {foodData[selectedDay][mealType] &&
          foodData[selectedDay][mealType].length > 0 ? (
            foodData[selectedDay][mealType].map((food) => (
              <tr key={food.id} className="border-b">
                <td className="border border-gray-300 px-4 py-2">
                  {food.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {food.calories}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {food.fats}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {food.protein}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {food.sugars}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => removeFoodItem(mealType, food.id)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="border border-gray-300 px-4 py-2 text-center text-gray-500"
              >
                No food items for this meal.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <button
        onClick={() => addFoodItem(mealType)}
        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Add Food
      </button>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      {/* Day Selector */}
      <div className="flex justify-around mb-4 sticky top-0 bg-white pt-10 pb-7 border border-b">
        {Object.keys(initialFoodData).map((day) => (
          <button
            key={day}
            onClick={() => handleDayChange(day)}
            className={`text-lg font-semibold py-2 px-4 rounded ${
              selectedDay === day
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 transition duration-300"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Meal Sections */}
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        {selectedDay}'s Food Timetable
      </h3>
      {renderMealSection("breakfast", "Breakfast")}
      {renderMealSection("lunch", "Lunch")}
      {renderMealSection("dinner", "Dinner")}
      {renderMealSection("snacks", "Snacks")}
    </div>
  );
};

export default FoodTimeTable;
