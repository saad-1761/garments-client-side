import Container from "../Container";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import { useEffect, useState } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import logo from "../../../assets/images/logo-flat.png";

const Navbar = ({ onOpenSidebar }) => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();
  
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login", { replace: true }); // 👈 redirect to login
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setIsDark(true);
  }, []);

  useEffect(() => {
    const theme = isDark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [isDark]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinkClass = ({ isActive }) =>
    `text-base font-medium transition
     ${isActive ? "text-primary" : "text-base-content hover:text-primary"}`;

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
    <header className="fixed top-0 w-full z-40 bg-base-100/80 backdrop-blur border-b border-secondary">
      <Container>
        <div className="h-16 flex items-center justify-between">
          {/* LEFT: Drawer button (mobile/tablet) + Logo */}
          <div className="flex items-center gap-2">
            {/* Sidebar opener ONLY on md and below */}
            {onOpenSidebar && (
              <button
                type="button"
                onClick={onOpenSidebar}
                className="lg:hidden btn btn-ghost btn-sm"
                aria-label="Open sidebar"
              >
                <BsThreeDotsVertical className="text-xl" />
              </button>
            )}

            <Link to="/" className="block">
              <img
                src={logo}
                alt="logo"
                className="w-20 md:w-24 object-contain"
              />
            </Link>
          </div>

          {/* Center Nav (desktop) */}
          <nav className="hidden md:flex items-center gap-8">{navLinks}</nav>

          {/* Right (desktop) */}
          <div className="hidden md:flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="toggle toggle-sm toggle-primary"
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
                  to="/login"
                  className="btn btn-sm btn-outline btn-primary"
                >
                  Login
                </Link>
                <Link to="/signup" className="btn btn-sm btn-primary">
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="btn btn-ghost p-1">
                  <img
                    src={user.photoURL || avatarImg}
                    alt="avatar"
                    className="w-9 h-9 rounded-full"
                  />
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-outline btn-primary"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile nav menu button (keeps your dropdown for links) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 border border-base-300 rounded-full"
            aria-label="Open nav menu"
          >
            <AiOutlineMenu size={22} />
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isOpen && (
          <div className="md:hidden mt-3 rounded-xl bg-base-100 shadow-lg border border-base-200 p-4 animate-[fadeIn_.2s_ease-out]">
            <div className="flex flex-col gap-4 text-base">
              {navLinks}

              <label className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  className="toggle toggle-sm toggle-primary"
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
                    className="btn btn-sm btn-outline btn-primary"
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
                    to="/dashboard"
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
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="btn btn-sm btn-outline btn-primary"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </Container>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(4px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </header>
  );
};

export default Navbar;
