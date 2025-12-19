import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import logo from "../../../assets/images/logo-flat.png";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  /* -------- Load theme -------- */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setIsDark(true);
  }, []);

  /* -------- Apply theme -------- */
  useEffect(() => {
    const theme = isDark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [isDark]);

  /* -------- Close menu on route change -------- */
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  /* -------- Active link style -------- */
  const navLinkClass = ({ isActive }) =>
    `text-base font-medium transition
     ${isActive ? "text-primary" : "text-base-content hover:text-primary"}`;

  /* -------- Navigation Links -------- */
  const navLinks = (
    <>
      <NavLink onClick={() => setIsOpen(false)} className={navLinkClass} to="/">
        Home
      </NavLink>

      <NavLink
        onClick={() => setIsOpen(false)}
        className={navLinkClass}
        to="/all-products"
      >
        All Products
      </NavLink>

      {user && (
        <NavLink
          onClick={() => setIsOpen(false)}
          className={navLinkClass}
          to="/dashboard"
        >
          Dashboard
        </NavLink>
      )}

      {!user && (
        <>
          <NavLink
            onClick={() => setIsOpen(false)}
            className={navLinkClass}
            to="/about"
          >
            About Us
          </NavLink>
          <NavLink
            onClick={() => setIsOpen(false)}
            className={navLinkClass}
            to="/contact"
          >
            Contact
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <header className="fixed top-0 w-full z-20 bg-base-100/80 backdrop-blur border-b border-base-200">
      <Container>
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className="w-20 md:w-24 object-contain"
            />
          </Link>

          {/* Center Nav */}
          <nav className="hidden md:flex items-center gap-8">{navLinks}</nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="toggle toggle-sm"
                checked={isDark}
                onChange={() => setIsDark(!isDark)}
              />
              <span className="text-sm font-medium">
                {isDark ? "Dark" : "Light"}
              </span>
            </label>

            {!user ? (
              <>
                <Link to="/login" className="btn btn-sm btn-outline">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-sm btn-primary">
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link to="/profile" className="btn btn-ghost p-1">
                  <img
                    src={user.photoURL || avatarImg}
                    alt="avatar"
                    className="w-9 h-9 rounded-full"
                  />
                </Link>
                <button onClick={logOut} className="btn btn-sm btn-outline">
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 border border-base-300 rounded-full"
          >
            <AiOutlineMenu size={22} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-3 rounded-xl bg-base-100 shadow-lg border border-base-200 p-4">
            <div className="flex flex-col gap-4 text-base">
              {navLinks}

              {/* Theme Toggle */}
              <label className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  className="toggle toggle-sm"
                  checked={isDark}
                  onChange={() => setIsDark(!isDark)}
                />
                <span className="text-sm font-medium">
                  {isDark ? "Dark" : "Light"}
                </span>
              </label>

              {!user ? (
                <>
                  <Link
                    onClick={() => setIsOpen(false)}
                    to="/login"
                    className="btn btn-sm btn-outline"
                  >
                    Login
                  </Link>
                  <Link
                    onClick={() => setIsOpen(false)}
                    to="/signup"
                    className="btn btn-sm btn-primary"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    onClick={() => setIsOpen(false)}
                    to="/profile"
                    className="flex items-center gap-2"
                  >
                    <img
                      src={user.photoURL || avatarImg}
                      className="w-8 h-8 rounded-full"
                      alt="profile"
                    />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={() => {
                      logOut();
                      setIsOpen(false);
                    }}
                    className="btn btn-sm btn-outline"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Navbar;
