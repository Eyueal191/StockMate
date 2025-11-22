import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { User, LogOut, Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

function DashboardHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  const logOut = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const getLinkClass = (path) =>
    `px-4 py-2 rounded-md transition-all text-sm sm:text-base md:text-lg lg:text-xl focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-gray-700 border-b-2 ${
      location.pathname === path ? "border-blue-400 font-semibold" : "border-transparent"
    } text-white`;

  // Items link active logic
  const getItemsLinkClass = () => {
    const currentPath = location.pathname.replace(/\/$/, "");
    const activePaths = ["/dashboard", "/dashboard/items"];
    const isActive = activePaths.includes(currentPath);
    return `px-4 py-2 rounded-md transition-all text-sm sm:text-base md:text-lg lg:text-xl focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-gray-700 border-b-2 ${
      isActive ? "border-blue-400 font-semibold" : "border-transparent"
    } text-white`;
  };

  return (
    <header className="bg-gray-900 shadow-md sticky top-0 z-50">
      <nav className="flex items-center justify-between h-24 sm:h-28 md:h-32 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-20">
        {/* Logo */}
        <div className="flex-shrink-0">
          <NavLink to="/dashboard/items">
            <img src={logo} alt="StockMate Logo" className="h-12 sm:h-16 md:h-20 lg:h-24" />
          </NavLink>
        </div>

        {/* Desktop / Tablet Links */}
        <div className="hidden md:flex flex-1 justify-center max-w-3xl gap-10 xl:gap-16 2xl:gap-20">
          <NavLink to="/dashboard/reports" className={getLinkClass("/dashboard/reports")}>
            Report
          </NavLink>
          <NavLink to="/dashboard/items" className={getItemsLinkClass()}>
            Items
          </NavLink>
          <NavLink to="/dashboard/sales" className={getLinkClass("/dashboard/sales")}>
            Sales
          </NavLink>
          <NavLink to="/dashboard/categories" className={getLinkClass("/dashboard/categories")}>
            Category
          </NavLink>
        </div>

        {/* Right account/logout & mobile toggle */}
        <div className="flex items-center gap-4">
          <NavLink
            to="/dashboard/account"
            className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-700 transition-colors text-sm sm:text-base md:text-lg lg:text-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
          >
            <User size={18} />
            Account
          </NavLink>
          <button
            onClick={logOut}
            className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-700 transition-colors text-sm sm:text-base md:text-lg lg:text-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
          >
            <LogOut size={18} />
            Logout
          </button>

          {/* Hamburger menu */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={toggleMobileMenu}
          >
            {mobileOpen ? <X size={24} color="white" /> : <Menu size={24} color="white" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="absolute top-full left-0 w-full bg-gray-900 flex flex-col gap-2 p-4 md:hidden z-50 border-t border-gray-700">
            <NavLink
              to="/dashboard/reports"
              className={getLinkClass("/dashboard/reports")}
              onClick={() => setMobileOpen(false)}
            >
              Report
            </NavLink>
            <NavLink
              to="/dashboard/items"
              className={getItemsLinkClass()}
              onClick={() => setMobileOpen(false)}
            >
              Items
            </NavLink>
            <NavLink
              to="/dashboard/sales"
              className={getLinkClass("/dashboard/sales")}
              onClick={() => setMobileOpen(false)}
            >
              Sales
            </NavLink>
            <NavLink
              to="/dashboard/categories"
              className={getLinkClass("/dashboard/categories")}
              onClick={() => setMobileOpen(false)}
            >
              Category
            </NavLink>
            <NavLink
              to="/dashboard/account"
              className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-700 transition-colors text-sm sm:text-base md:text-lg lg:text-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
              onClick={() => setMobileOpen(false)}
            >
              <User size={18} />
              Account
            </NavLink>
            <button
              onClick={() => {
                logOut();
                setMobileOpen(false);
              }}
              className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-700 transition-colors text-sm sm:text-base md:text-lg lg:text-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
export default DashboardHeader;
