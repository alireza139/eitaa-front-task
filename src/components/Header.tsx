import { IoMoonSharp } from "react-icons/io5";
import { MdSunny } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa6";
import { useThemeStore } from "../store/useThemeStore"; 

function Header() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <header className="bg-orange-600 dark:bg-gray-700 w-full h-22 md:h-30">
      <div className="header-top hidden md:flex items-center justify-between bg-orange-100 dark:bg-gray-500 w-[98%] h-20 px-5 mx-4 rounded-b-xl">
        <ul className="hidden md:flex md:gap-x-8 lg:gap-x-14 lg:text-xl w-full justify-center text-gray-600 dark:text-white">
          <li><a href="#">Home</a></li>
          <li><a href="#">Users</a></li>
          <li><a href="#">Posts</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
        <div className="header-logo w-40 h-15 rounded-xl shadow bg-orange-600 dark:bg-gray-700 flex justify-center items-center">
          <a href="#" className="bg-orange-100 w-[90%] h-[70%] rounded-xl flex justify-center items-center font-bold text-orange-600 text-3xl shadow dark:text-gray-700">
            Eitaa
          </a>
        </div>
      </div>

      <div className="header-bottom flex justify-between mx-4 md:mt-1 items-center h-full md:h-max">
        <div className="flex gap-4">

          {/* دکمه‌ی تغییر تم */}
          <button 
            onClick={toggleTheme} 
            className="bg-orange-50 w-8 h-8 rounded-full flex items-center justify-center shadow"
          >
            {theme === "light" ? (
              <IoMoonSharp className="text-gray-600 text-xl" />
            ) : (
              <MdSunny className="text-orange-600 text-xl" />
            )}
          </button>

          <a href="#" className="bg-orange-50 w-8 h-8 rounded-full flex items-center justify-center shadow">
            <FaUsers className="text-orange-600 dark:text-gray-700 text-xl" />
          </a>

          <a href="#" className="hidden bg-orange-50 w-8 h-8 rounded-full md:flex items-center justify-center shadow">
            <FaProductHunt className="text-orange-600 dark:text-gray-700 text-xl" />
          </a>
        </div>

        <div className="md:hidden w-30 h-15 rounded-xl shadow bg-orange-700 dark:bg-gray-500 flex justify-center items-center">
          <a href="#" className="bg-orange-50 dark:bg-gray-700 w-[90%] h-[70%] rounded-xl flex justify-center items-center font-bold text-orange-700 dark:text-white text-3xl shadow">
            Eitaa
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
