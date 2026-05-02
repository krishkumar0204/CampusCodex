import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import ProfileIcon from "../assets/profile_icon.png";
import { getApiBaseUrl } from "../utils/api";

export default function Navbar() {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const apiBaseUrl = getApiBaseUrl();

  const linkClass = ({ isActive }) =>
    [
      "text-sm sm:text-md font-semibold transition duration-300 ease",
      isActive ? "text-orange-500" : "text-slate-700 hover:text-orange-500",
    ].join(" ");

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${apiBaseUrl}/auth/logout`,
        {},
        { withCredentials: true },
      );
      setIsAuth(false);
      closeMenu();
      window.dispatchEvent(new Event("auth-changed"));
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Logout failed");
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${apiBaseUrl}/auth/me`, {
          withCredentials: true,
        });

        setIsAuth(res.data.isAuth);
      } catch (err) {
        console.error(err);
        setIsAuth(false);
      }
    };
    checkAuth();
    window.addEventListener("auth-changed", checkAuth);

    return () => window.removeEventListener("auth-changed", checkAuth);
  }, [apiBaseUrl]);

  return (
    <>
      <header className="fixed left-0 top-0 z-50 flex min-h-15 w-full items-center justify-between gap-3 border-b border-neutral-300 bg-white px-4 shadow-md sm:px-6 lg:px-10">
        <Link
          to="/"
          className="shrink-0 text-lg font-semibold text-blue-400 sm:text-xl md:text-2xl"
          onClick={closeMenu}
        >
          Campus<span className="text-orange-500">Codex</span>
        </Link>

        <nav className="hidden min-w-0 items-center justify-end gap-5 md:flex">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/notes" className={linkClass}>
            Notes
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            Contact
          </NavLink>
          {isAuth && (
            <NavLink to="/addnotes" className={linkClass}>
              Add Notes
            </NavLink>
          )}
        </nav>

        <div className="flex items-center justify-end gap-3">
          <div className="group relative hidden md:inline-block">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 shadow-sm transition hover:bg-slate-50"
              aria-label="Open profile menu"
            >
              <img src={ProfileIcon} alt="user_login" className="h-6 w-5" />
            </button>

            <div className="invisible absolute right-0 z-50 mt-2 flex w-44 flex-col rounded-md bg-slate-100 p-3 opacity-0 shadow-lg transition-all duration-300 group-hover:visible group-hover:opacity-100">
              {!isAuth ? (
                <>
                  <NavLink
                    to="/login"
                    className="rounded-md px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200 hover:text-orange-500"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="mt-1 rounded-md px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200 hover:text-orange-500"
                  >
                    Register
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/dashboard"
                    className="flex items-center gap-2 rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-600"
                  >
                    <LayoutDashboard size={16} />
                    Dashboard
                  </NavLink>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-600"
                  >
                    Logout
                    <LogOut size={16} />
                  </button>
                </>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 hover:text-orange-500 md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed left-0 right-0 top-15 z-40 border-b border-neutral-200 bg-white px-4 py-4 shadow-lg md:hidden">
          <nav className="flex flex-col gap-3">
            <NavLink to="/" end className={linkClass} onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink to="/notes" className={linkClass} onClick={closeMenu}>
              Notes
            </NavLink>
            <NavLink to="/about" className={linkClass} onClick={closeMenu}>
              About
            </NavLink>
            <NavLink to="/contact" className={linkClass} onClick={closeMenu}>
              Contact
            </NavLink>
            {isAuth ? (
              <>
                <NavLink
                  to="/addnotes"
                  className={linkClass}
                  onClick={closeMenu}
                >
                  Add Notes
                </NavLink>
                <NavLink
                  to="/dashboard"
                  className={linkClass}
                  onClick={closeMenu}
                >
                  Dashboard
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/login" className={linkClass} onClick={closeMenu}>
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={linkClass}
                  onClick={closeMenu}
                >
                  Register
                </NavLink>
              </>
            )}
          </nav>
        </div>
      )}
    </>
  );
}
