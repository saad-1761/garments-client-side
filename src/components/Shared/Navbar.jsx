import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { FaBars } from "react-icons/fa";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import { AuthContext } from "../../providers/authContext/AuthContext";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState("light");

  // Sync with localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const handleToggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleLogout = async () => {
    await logOut();
  };

  return (
    <div className="navbar bg-secondary shadow-md px-4">
      {/* LEFT SIDE: Hamburger + Logo */}
      <div className="navbar-start">
        {/* Hamburger - hidden on large screens */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <FaBars size={20} />
          </label>

          <ul
            tabIndex={0}
            className="menu dropdown-content mt-3 z-[50] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {/* NAV LINKS SMALL */}
            <li>
              <NavLink to="/">Home</NavLink>
            </li>

            {/* THEME TOGGLE SMALL */}
            <li className="mt-2">
              <button onClick={handleToggleTheme} className="btn btn-sm">
                {theme === "light" ? (
                  <IoMoonOutline size={18} />
                ) : (
                  <IoSunnyOutline size={18} />
                )}
                {theme === "light" ? "Dark Mode" : "Light Mode"}
              </button>
            </li>
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="font-bold text-xl ml-2">
          MyApp
        </Link>
      </div>

      {/* CENTER: LINKS large screen only */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
        </ul>
      </div>

      {/* RIGHT SIDE */}
      <div className="navbar-end flex items-center gap-3">
        {/* THEME TOGGLE LARGE SCREENS */}
        <button
          onClick={handleToggleTheme}
          className="btn btn-ghost btn-circle hidden lg:flex"
        >
          {theme === "light" ? (
            <IoMoonOutline size={22} />
          ) : (
            <IoSunnyOutline size={22} />
          )}
        </button>

        {/* SHOW LOGIN/REGISTER IF USER IS NOT LOGGED IN */}
        {!user && (
          <div className="flex gap-2">
            <Link to="/login" className="btn btn-sm">
              Login
            </Link>
            <Link to="/register" className="btn btn-sm btn-outline">
              Register
            </Link>
          </div>
        )}

        {/* IF USER LOGGED IN → SHOW AVATAR */}
        {user && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  referrerPolicy="no-referrer"
                  src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt="user"
                />
              </div>
            </label>

            <ul
              tabIndex={0}
              className="menu dropdown-content mt-3 z-[50] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/update-profile">Update Profile</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
