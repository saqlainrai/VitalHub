
const NavbarMain = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 sticky top-0">
      <div className="container mx-auto flex justify-between items-center">
        {/* Title on the Left */}
        <div className="text-lg font-bold ml-4">VitalHub</div>

        {/* Center Menu Items */}
        <div className="flex space-x-20 text-sm font-medium">
          <a href="#food" className="hover:text-blue-300">
            Food
          </a>
          <a href="#fitness" className="hover:text-blue-300">
            Fitness
          </a>
          <a href="#money" className="hover:text-blue-300">
            Money
          </a>
          <a href="#passwords" className="hover:text-blue-300">
            Passwords
          </a>
        </div>

        {/* Name on the Right */}
        <div className="flex items-center space-x-[1px] lg:space-x-2 md:space-x-1 sm:space-x-[1px]">
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
            className=" size-4"
          />
        </div>
      </div>
    </nav>
  );
};

export default NavbarMain;
