// src/components/bars/CategoryNavBar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { PlusCircle, List } from "lucide-react";

function CategoryNavBar() {
  const location = useLocation();

  const navItems = [
    { name: "Add Category", icon: PlusCircle, path: "/dashboard/categories/add" },
    { name: "Category List", icon: List, path: "/dashboard/categories" },
  ];

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;

    return `
      flex items-center gap-2 sm:gap-3 rounded-lg font-semibold
      text-[0.75rem] sm:text-[0.875rem] md:text-[1rem] lg:text-[1.125rem] xl:text-[1.25rem]
      transition-all duration-200
      ${isActive ? "bg-blue-600 text-white shadow-lg" : "bg-gray-100 text-gray-900 hover:bg-gray-200"}
      px-3 py-2 sm:px-4 sm:py-2 md:px-4 md:py-3 lg:px-5 lg:py-3 xl:px-6 xl:py-4
    `;
  };

  return (
    <nav
      className="
        flex flex-row md:flex-col
        items-center md:items-start
        justify-around md:justify-start
        w-full md:w-64
        h-full
        bg-white
        shadow-md md:shadow-none
        border-b md:border-b-0 md:border-r border-gray-200
        p-2 md:p-4
        gap-2 md:gap-2
      "
    >
      {/* Title */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center md:text-left">
        Category Management
      </h2>

      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`
              ${getLinkClass(item.path)}
              mx-auto md:mx-0
              justify-center md:justify-start
              w-full md:w-auto
              hover:scale-105
              active:scale-95
              transition-transform duration-150
            `}
          >
            <Icon className="h-5 w-5 sm:h-5 md:h-6 lg:h-7 xl:h-8" />
            <span className="truncate">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default CategoryNavBar;
