import React, { useState, useEffect } from "react";
import axios from "axios";

// Initialize with empty foodData
const initialFoodData = {};

const FoodTimeTable = () => {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [foodData, setFoodData] = useState(initialFoodData);

  // Fetch the food data
  useEffect(() => {
    fetchFoodData();
  }, []);

  const fetchFoodData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/get-food");

      // Map server response by day to group meals by day
      const groupedData = response.data.reduce((acc, item) => {
        const day = item.day;
        if (!acc[day]) acc[day] = {};
        if (!acc[day][item.mealType]) acc[day][item.mealType] = [];

        acc[day][item.mealType].push({
          id: item._id,
          name: item.name[0],
          calories: item.calories,
          fats: item.fats,
          protein: item.protein,
          sugars: item.sugars,
        });

        return acc;
      }, {});

      setFoodData(groupedData);
    } catch (error) {
      console.error("Error fetching food data from server", error);
    }
  };

  const handleDayChange = (day) => {
    setSelectedDay(day);
  };

  const removeFoodItem = async (mealType, id) => {
    try {
      await axios.delete(`http://localhost:5000/api/remove-food/${id}`);
      setFoodData((prevData) => ({
        ...prevData,
        [selectedDay]: {
          ...prevData[selectedDay],
          [mealType]: prevData[selectedDay][mealType].filter(
            (item) => item.id !== id
          ),
        },
      }));
    } catch (error) {
      console.error("Error deleting food item", error);
    }
  };

  const addFoodItem = async (mealType) => {
    // Logic to add food item can be customized here
    alert(`Add Food functionality for ${mealType}`);
    // Example: Redirect or open modal
  };

  const updateFoodItem = async (id) => {
    // Logic to handle updates
    alert(`Update Food item with ID: ${id}`);
    // Example: Redirect or show form/modal
  };

  const renderMealSection = (mealType, mealName) => (
    <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
      <h4 className="text-lg font-semibold text-gray-700 mb-2">{mealName}</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white rounded-lg">
          <thead className="bg-blue-100">
            <tr>
              {["Food", "Calories", "Fats", "Protein", "Sugars", "Actions"].map(
                (header) => (
                  <th
                    key={header}
                    className="border px-3 py-2 text-sm font-medium text-gray-600 text-left"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {foodData[selectedDay] &&
            foodData[selectedDay][mealType] &&
            foodData[selectedDay][mealType].length > 0 ? (
              foodData[selectedDay][mealType].map((food) => (
                <tr key={food.id} className="border-b hover:bg-blue-50">
                  <td className="border px-3 py-2 text-gray-700">
                    {food.name}
                  </td>
                  <td className="border px-3 py-2 text-gray-600">
                    {food.calories}
                  </td>
                  <td className="border px-3 py-2 text-gray-600">
                    {food.fats}
                  </td>
                  <td className="border px-3 py-2 text-gray-600">
                    {food.protein}
                  </td>
                  <td className="border px-3 py-2 text-gray-600">
                    {food.sugars}
                  </td>
                  <td className="border px-3 py-2 text-blue-600 hover:text-blue-800 cursor-pointer">
                    <span
                      onClick={() => removeFoodItem(mealType, food.id)}
                      className="hover:underline"
                    >
                      Remove
                    </span>{" "}
                    |{" "}
                    <span
                      onClick={() => updateFoodItem(food.id)}
                      className="hover:underline cursor-pointer text-green-600"
                    >
                      Update
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="border px-3 py-2 text-center text-gray-500 text-sm"
                >
                  No food items for this meal.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Food Button */}
      <div className="mt-2 text-center">
        <button
          className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
          onClick={() => addFoodItem(mealType)}
        >
          Add Food
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-md p-6 rounded-lg mb-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Weekly Food TimeTable
        </h1>

        {/* Days Buttons */}
        <div className="flex justify-center space-x-2 mb-4">
          {Object.keys(foodData).map((day) => (
            <button
              key={day}
              onClick={() => handleDayChange(day)}
              className={`py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedDay === day
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Render Meals */}
        {["lunch", "dinner", "snacks", "breakfast"].map((meal) =>
          renderMealSection(meal, meal.charAt(0).toUpperCase() + meal.slice(1))
        )}
      </div>
    </div>
  );
};

export default FoodTimeTable;
