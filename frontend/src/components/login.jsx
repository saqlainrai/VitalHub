import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import eye icons from react-icons

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500 p-2"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 top-6 flex items-center pr-3"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible
                  className="h-5 w-5 text-gray-500"
                  aria-hidden="true"
                />
              ) : (
                <AiOutlineEye
                  className="h-5 w-5 text-gray-500"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="mr-2 shadow-xl" />
              <label htmlFor="remember" className="text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </div>
          <div className="flex items-center mb-4">
            <input type="checkbox" id="captcha" className="mr-2 shadow-2xl" />
            <label htmlFor="captcha" className="text-sm text-gray-600">
              I am not a robot
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white font-semibold py-2 rounded-md hover:bg-yellow-700 transition duration-200"
          >
            Login
          </button>
        </form>
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-600">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <button className="w-full shadow-lg border flex text-center justify-center items-center font-semibold py-2 rounded-md hover:bg-red-700 transition duration-200">
          <img
            src="https://mailmeteor.com/logos/assets/PNG/Gmail_Logo_256px.png"
            alt=""
            className="size-3 mr-4"
          />
          Continue with Google
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?
          <a href="#" className="text-blue-500 hover:underline">
            {" "}
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
