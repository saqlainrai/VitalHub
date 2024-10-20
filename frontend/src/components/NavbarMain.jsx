import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import arrow_logo from "../../public/arrow_top.png";

const NavbarMain = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null); // Create a ref for the dropdown
  const navigate = useNavigate(); // Initialize navigate

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  // Close dropdown if clicked outside of it
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    // Add event listener for clicks
    if (dropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownVisible]);

  return (
    <nav className="bg-gray-800 text-white p-4 top-0">
      <div className="container mx-auto flex justify-between items-center">
        {/* Title on the Left */}
        <div className="flex items-center justify-center">
          <div className="flex items-center w-28 sm:w-28 md:w-36 lg:w-25 xl:w-25 h-12">
            <div className="flex items-center">
              <img
                src={arrow_logo} // Use <img> for the logo
                alt="logo"
                className="object-contain size-10" // Ensure the image maintains its aspect ratio
              />
              <h3 className="font-semibold">VitalHub.</h3>
            </div>
          </div>
        </div>

        {/* Center Menu Items */}
        <div className="flex space-x-20 text-sm font-medium">
          <button
            className="hover:text-blue-300"
            onClick={() => navigate("/welcome")} // Navigate to /welcome on click
          >
            Food
          </button>
          <button
            className="hover:text-blue-300"
            onClick={() => navigate("/fitness")} // Replace with appropriate route if needed
          >
            Fitness
          </button>
          <button
            className="hover:text-blue-300"
            onClick={() => navigate("/expensesDashboard")} // Navigate to /expensesDashboard on click
          >
            Money
          </button>
          <button
            className="hover:text-blue-300"
            onClick={() => navigate("/passwords")} // Replace with appropriate route if needed
          >
            Passwords
          </button>
        </div>

        {/* Name on the Right */}
        <div className="relative flex items-center space-x-[1px] lg:space-x-2 md:space-x-1 sm:space-x-[1px]">
          <div
            className="flex items-center cursor-pointer"
            onClick={toggleDropdown}
          >
            <img
              src="https://images.pexels.com/photos/12311410/pexels-photo-12311410.jpeg"
              alt="profile"
              className="size-8 rounded-full"
            />
            <p className="text-[9px] sm:text-[9px] md:text-[11px] lg:text-[13px] h-auto">
              Anita Maika
            </p>
            <img
              src="https://cdn3.iconfinder.com/data/icons/faticons/32/arrow-up-01-1024.png"
              alt="triangle up"
              className="size-4"
            />
          </div>

          {/* Dropdown Menu */}
          {dropdownVisible && (
            <div
              ref={dropdownRef} // Attach the ref to the dropdown
              className="absolute right-0 top-6 bg-gray-700 text-white mt-2 w-40 rounded shadow-lg"
            >
              <ul>
                <li
                  className="p-2 hover:bg-gray-600 cursor-pointer"
                  onClick={() => setDropdownVisible(false)}
                >
                  Profile
                </li>
                <li
                  className="p-2 hover:bg-gray-600 cursor-pointer"
                  onClick={() => setDropdownVisible(false)}
                >
                  Settings
                </li>
                <li
                  className="p-2 hover:bg-gray-600 cursor-pointer"
                  onClick={() => setDropdownVisible(false)}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarMain;
