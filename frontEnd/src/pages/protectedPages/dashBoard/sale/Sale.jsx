// src/pages/protectedPages/dashBoard/sale/Sale.jsx
import React from "react";
import { Outlet, NavLink } from "react-router-dom";

function Sale() {
  const activeClass =
    "flex items-center justify-center gap-2 text-white bg-blue-600 px-5 py-3 md:py-4 rounded-xl font-semibold md:font-bold text-sm sm:text-base md:text-lg transition-all duration-200";
  const inactiveClass =
    "flex items-center justify-center gap-2 text-gray-600 bg-gray-50 hover:text-blue-600 hover:bg-blue-50 px-5 py-3 md:py-4 rounded-xl font-normal md:font-medium text-sm sm:text-base md:text-lg transition-all duration-200";

  return (
    <div className="flex flex-col w-full bg-gray-100 min-h-screen">
      
      {/* Desktop layout (>md): Sidebar + Main content */}
      <div className="hidden md:flex flex-col w-full">

        {/* Sidebar + Main */}
        <div className="flex flex-1 w-full">
          
          {/* Sidebar */}
          <aside className="w-64 bg-white p-6 shadow-sm">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Sales Management
            </h2>
            <nav className="flex flex-col gap-4">
              <NavLink
                to="/dashboard/sales"
                end
                className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
              >
                📝 Sale History
              </NavLink>
              <NavLink
                to="/dashboard/sales/add"
                className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
              >
                ➕ Add New Sale
              </NavLink>
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 p-6 overflow-auto bg-gray-50">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Mobile layout (<md) */}
      <div className="flex flex-col md:hidden w-full items-center px-4 space-y-4">

        {/* Sidebar */}
        <aside className="w-full bg-white p-4 shadow-sm rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
            Sales Management
          </h2>
          <nav className="flex justify-center gap-4">
            <NavLink
              to="/dashboard/sales"
              end
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
              📝 Sale History
            </NavLink>
            <NavLink
              to="/dashboard/sales/add"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
              ➕ Add New Sale
            </NavLink>
          </nav>
        </aside>

        {/* Main content */}
        <main className="w-full p-4 bg-gray-50 rounded-lg">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Sale;
