import React from "react";
import { NavLink } from "react-router-dom";

function SaleNavBar() {
  return (
    <nav className="bg-gray-100 p-4 shadow-md">
      <ul className="flex gap-4">
        <li>
          <NavLink
            to="/sales"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                : "text-gray-700 hover:text-blue-500"
            }
          >
            Sales List
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/sales/add"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                : "text-gray-700 hover:text-blue-500"
            }
          >
            Add Sale
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default SaleNavBar;
