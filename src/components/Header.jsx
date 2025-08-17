import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useApp } from "../context/AppContext"; // adjust if your hook differs

export function Header() {
  const { state, dispatch } = useApp();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const panelRef = useRef(null);
  const toggleRef = useRef(null); // NEW: ref for hamburger button

  // Close on route change
  useEffect(() => setOpen(false), [location.pathname]);

  // Close when resizing to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Close on Esc and outside click (but ignore clicks on the toggle button)
  useEffect(() => {
    if (!open) return;

    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    const onMouseDown = (e) => {
      const t = e.target;
      if (panelRef.current && panelRef.current.contains(t)) return;     // click inside panel → ignore
      if (toggleRef.current && toggleRef.current.contains(t)) return;   // click hamburger → ignore
      setOpen(false);                                                   // true outside click
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onMouseDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onMouseDown);
    };
  }, [open]);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    isActive ? "text-white font-semibold" : "hover:text-blue-200";

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] bg-blue-600 text-white shadow">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Brand */}
          <NavLink to="/dashboard" className="text-xl font-semibold">
            Job Tracker
          </NavLink>

          {/* Desktop nav (>= md) */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
            <NavLink to="/add" className={linkClass}>Add Job</NavLink>
            <NavLink to="/profile" className={linkClass}>Profile</NavLink>
            {state.isLoggedIn ? (
              <button onClick={logout} className="bg-red-500 px-3 py-1.5 rounded hover:bg-red-600">
                Logout
              </button>
            ) : (
              <NavLink to="/login" className="bg-white text-blue-600 px-3 py-1.5 rounded hover:bg-blue-50">
                Login
              </NavLink>
            )}
          </div>

          {/* Mobile hamburger (< md) */}
          <button
            ref={toggleRef}                              
            type="button"
            onClick={() => setOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="md:hidden inline-flex items-center justify-center rounded p-2 ring-1 ring-white/30 hover:bg-blue-500 focus:outline-none"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        ref={panelRef}                                   
        className={
          "md:hidden absolute left-0 right-0 top-16 bg-blue-600 border-t border-blue-500 shadow-lg transition-all duration-200 " +
          (open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-full pointer-events-none")
        }
        style={{ willChange: "transform" }}
      >
        <div className="px-4 py-4 space-y-3">
          <div className="flex flex-col gap-3 text-base">
            <NavLink to="/dashboard" className="hover:text-blue-200">Dashboard</NavLink>
            <NavLink to="/add" className="hover:text-blue-200">Add Job</NavLink>
            <NavLink to="/profile" className="hover:text-blue-200">Profile</NavLink>
          </div>
          <div className="pt-3">
            {state.isLoggedIn ? (
              <button onClick={logout} className="w-full bg-white text-blue-600 px-3 py-2 rounded hover:bg-blue-50">
                Logout
              </button>
            ) : (
              <NavLink to="/login" className="w-full inline-block text-center bg-white text-blue-600 px-3 py-2 rounded hover:bg-blue-50">
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
