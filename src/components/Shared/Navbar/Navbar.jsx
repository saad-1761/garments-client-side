import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import logo from "../../../assets/images/logo-flat.png";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  /* -------- Load theme from localStorage (on mount) -------- */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
    }
  }, []);

  /* -------- Apply & persist theme -------- */
  useEffect(() => {
    const themeName = isDark ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", themeName);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  /* -------- Close mobile menu on route change -------- */
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  /* ---------------- Navigation links ---------------- */
  const navLinks = (
    <>
      <Link className="hover:text-primary" to="/">
        Home
      </Link>
      <Link className="hover:text-primary" to="/all-products">
        All Products
      </Link>
      {user && (
        <Link className="hover:text-primary" to="/dashboard">
          Dashboard
        </Link>
      )}
      {!user && (
        <>
          <Link className="hover:text-primary" to="/about">
            About Us
          </Link>
          <Link className="hover:text-primary" to="/contact">
            Contact
          </Link>
        </>
      )}
    </>
  );

  return (
    <div className="fixed w-full z-10 bg-base-100 shadow-sm">
      <div className="py-4">
        <Container>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/">
              <img src={logo} alt="logo" className="w-24" />
            </Link>

            {/* Center Nav (Desktop) */}
            <div className="hidden md:flex items-center gap-6 font-medium">
              {navLinks}
            </div>

            {/* Right Actions (Desktop) */}
            <div className="hidden md:flex items-center gap-3">
              {/* Theme Toggle */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="toggle toggle-sm"
                  checked={isDark}
                  onChange={() => setIsDark(!isDark)}
                />
                <span className="text-sm">{isDark ? "Dark" : "Light"}</span>
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
                  <Link to="/profile" className="btn btn-sm btn-ghost p-1">
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

            {/* Mobile Hamburger */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 border rounded-full"
              >
                <AiOutlineMenu size={22} />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden mt-4 rounded-xl bg-base-100 shadow-lg p-4">
              <div className="flex flex-col gap-3">
                {navLinks}

                {/* Theme Toggle (Mobile) */}
                <label className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    className="toggle toggle-sm"
                    checked={isDark}
                    onChange={() => setIsDark(!isDark)}
                  />
                  <span className="text-sm">{isDark ? "Dark" : "Light"}</span>
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
                    <Link to="/profile" className="flex items-center gap-2">
                      <img
                        src={user.photoURL || avatarImg}
                        className="w-8 h-8 rounded-full"
                        alt="profile"
                      />
                      <span>Profile</span>
                    </Link>
                    <button onClick={logOut} className="btn btn-sm btn-outline">
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
