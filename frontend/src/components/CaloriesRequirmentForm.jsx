import { useState, useEffect } from "react";

const MultiStepForm = () => {
  // State to track the current step
  const [step, setStep] = useState(1);

  // State to store form data for all steps
  const [formData, setFormData] = useState({
    activityLevel: "",
    age: "",
    weight: "",
    gender: "",
    goal: "",
    height: "",
    heightUnit: "cm", // Default unit for height
    weightUnit: "kg", // Default unit for weight
    feedback: "",
    dob: "", // Added DOB field
  });

  // State to determine if the buttons should be sticky
  const [isSticky, setIsSticky] = useState(false);

  // Handler for going to the next step
  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  // Handler for going to the previous step
  const prevStep = () => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1); // Move to the previous step
    } else {
      handleCustomBackAction(); // Execute custom logic for step === 1
    }
  };

  // Custom back action for step === 1
  const handleCustomBackAction = () => {
    // Add your custom logic here. Example: Navigate to another page
    console.log("Custom action for step 1");
    // Example: Redirect to the homepage or another screen
    // window.location.href = "/home"; // Uncomment if you want to redirect
  };

  // Handler for updating form data
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit handler for sending data to the backend
  const handleSubmit = async () => {
    try {
      const response = await fetch("https://your-backend-api.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting the form", error);
    }
  };

  // Progress bar width based on step
  const progressWidth = `${(step / 5) * 100}%`;

  // Sticky button logic
  useEffect(() => {
    const handleScroll = () => {
      const formBottom = document.getElementById("form-bottom");
      const formBottomOffset = formBottom?.getBoundingClientRect().top || 0;
      const windowHeight = window.innerHeight;

      // If the user scrolls past the bottom of the form, make the buttons sticky
      if (formBottomOffset < windowHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto mt-[3%] pb-[1%] shadow-2xl">
      {/* Progress bar */}
      <div className="relative">
        <div className="flex items-center justify-between">
          <div></div>
        </div>
        <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-t bg-blue-200">
          <div
            style={{ width: progressWidth }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-500"
          ></div>
        </div>
      </div>

      {/* Scrollable form content */}
      <div
        className="overflow-auto h-80 mb-6"
        style={{ maxHeight: "calc(100vh - 10px)" }} // Adjusted height for better viewing
      >
        {step === 1 && (
          <div className="border-b p-4 rounded-b-lg">
            <h2 className="text-center font-bold text-lg mb-4">
              Welcome Tabish, Please select one Goal from below
            </h2>
            <div className="flex flex-wrap justify-center">
              {[
                "Lose Weight",
                "Maintain Weight",
                "Gain Weight",
                "Gain Muscle",
                "Modify My Diet",
                "Manage Stress",
                "Increase Step Count",
              ].map((goal) => (
                <div
                  key={goal}
                  className={`border p-5 m-2 rounded-lg cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 ${
                    formData.goal === goal
                      ? "bg-blue-500 text-white border-blue-700"
                      : "bg-white text-gray-800 border-gray-300"
                  }`}
                  onClick={() => setFormData({ ...formData, goal })}
                >
                  {goal}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="border-b p-4 rounded-b-lg text-center mt-5 px-[25%]">
            <h2 className="text-lg font-bold mb-4">
              {formData.goal === "Lose Weight" &&
                "Great! You’ve just taken a big step on your journey."}
              {formData.goal === "Maintain Weight" &&
                "Great! You’ve just chosen to maintain your current health."}
              {formData.goal === "Gain Weight" &&
                "Great! You’ve set a goal to gain weight."}
              {formData.goal === "Gain Muscle" &&
                "Great! You’ve chosen to gain muscle."}
              {formData.goal === "Modify My Diet" &&
                "Great! You’re looking to modify your diet."}
              {formData.goal === "Manage Stress" &&
                "Great! You’re taking steps to manage stress."}
              {formData.goal === "Increase Step Count" &&
                "Great! You want to increase your activity."}
            </h2>
            <p>
              Did you know that tracking your food is a scientifically proven
              method to being successful? It’s called “self-monitoring” and the
              more consistent you are, the more likely you are to hit your
              goals.
            </p>
            <p className="text-red-700 ">
              Now, let’s talk about your goal to {formData.goal.toLowerCase()}.
            </p>
          </div>
        )}

        {step === 3 && (
          <div className="border-b p-4 rounded-b-lg mx-10">
            <h2 className="text-lg font-bold mb-2">
              What is your baseline activity level?
            </h2>
            <p className="text-gray-500 mb-4">
              Not including workouts—we count that separately
            </p>
            <div
              className={`border-2 p-3 rounded-lg mb-2 cursor-pointer ${
                formData.activityLevel === "Not Very Active"
                  ? "border-blue-500"
                  : "border-gray-300"
              }`}
              onClick={() =>
                setFormData({ ...formData, activityLevel: "Not Very Active" })
              }
            >
              <h3 className="font-bold text-md">Not Very Active</h3>
              <p className="text-gray-500 text-sm">
                Spend most of the day sitting (e.g., bank teller, desk job)
              </p>
            </div>
            <div
              className={`border-2 p-3 rounded-lg mb-2 cursor-pointer ${
                formData.activityLevel === "Lightly Active"
                  ? "border-blue-500"
                  : "border-gray-300"
              }`}
              onClick={() =>
                setFormData({ ...formData, activityLevel: "Lightly Active" })
              }
            >
              <h3 className="font-bold text-md">Lightly Active</h3>
              <p className="text-gray-500 text-sm">
                Spend a good part of the day on your feet (e.g., teacher,
                salesperson)
              </p>
            </div>
            <div
              className={`border-2 p-3 rounded-lg mb-2 cursor-pointer ${
                formData.activityLevel === "Active"
                  ? "border-blue-500"
                  : "border-gray-300"
              }`}
              onClick={() =>
                setFormData({ ...formData, activityLevel: "Active" })
              }
            >
              <h3 className="font-bold text-md">Active</h3>
              <p className="text-gray-500 text-sm">
                Spend a good part of the day doing some physical activity (e.g.,
                food server, postal carrier)
              </p>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="border-b p-4 rounded-b-lg">
            <h2 className="text-lg font-bold mb-2 text-center">
              Please select which Gender we should use to calculate your calorie
              needs.
            </h2>
            <div className="flex items-center justify-around px-[20%]">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Male
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Female
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={formData.gender === "Other"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Other
              </label>
            </div>

            {/* Height and Weight Inputs */}
            <div className="mt-4 flex flex-col items-center justify-center ">
              <h2 className="text-md font-bold mb-2">Your Height</h2>
              <div className="flex items-center   justify-center">
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="border w-[50%]  py-1 px-6 rounded-l-md"
                  placeholder="Height"
                  required
                />
                <select
                  name="heightUnit"
                  value={formData.heightUnit}
                  onChange={handleChange}
                  className="border-t border-b border-r p-1 rounded-r-md"
                >
                  <option value="cm">cm</option>
                  <option value="ft">ft</option>
                </select>
              </div>

              <h2 className="text-md font-bold mt-4 mb-2">Your Weight</h2>
              <div className="flex items-center justify-center">
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="border w-[50%]  py-1 px-6 rounded-l-md"
                  placeholder="Weight"
                  required
                />
                <select
                  name="weightUnit"
                  value={formData.weightUnit}
                  onChange={handleChange}
                  className="border-t border-b border-r p-1 rounded-r-md"
                >
                  <option value="kg">kg</option>
                  <option value="lb">lb</option>
                </select>
              </div>

              {/* Date of Birth Input */}
              <h2 className="text-md  font-bold mt-4 mb-2">
                Your Date of Birth
              </h2>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="border  w-[40%] p-2 rounded"
                required
              />
            </div>
          </div>
        )}

       
      </div>

      {/* Sticky buttons */}
      <div
        id="form-bottom"
        className={`flex justify-between ${
          isSticky ? "fixed bottom-0 left-0 right-0 bg-white" : ""
        } p-4 shadow-lg transition duration-300 ease-in-out`}
      >
        <button
          onClick={prevStep}
          className="bg-gray-300 text-gray-800 px-16 py-4 rounded-lg"
        >
          Previous
        </button>
        {step < 4 ? (
          <button
            onClick={nextStep}
            className="bg-blue-500 text-white px-16 py-4 rounded-lg"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-16 py-4 rounded-lg"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
