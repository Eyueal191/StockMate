import React, { lazy, Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Loading from "../../components/Loading.jsx";

const DashBoardHeader = lazy(() => import("../../components/DashBoardHeader.jsx"));
const DashBoardFooter = lazy(() => import("../../components/DashBoardFooter.jsx"));
const CategoryNavBar = lazy(() => import("../../components/bars/CategoryNavBar.jsx"));
const ItemsFilterBar = lazy(() => import("../../components/bars/ItemsFilterBar.jsx"));
const SearchBar = lazy(() => import("../../components/bars/SearchBar.jsx"));
const SaleNavBar = lazy(() => import("../../components/bars/SaleNavBar.jsx"));

function DashBoard() {
  const location = useLocation();

  const isItemsPage = location.pathname === "/dashboard" || location.pathname === "/dashboard/items";
  const isCategoriesPage = location.pathname.includes("/categories");
  const isSalesPage =
    location.pathname === "/dashboad/sales" || location.pathname === "/dashboard/sales/add";

  // Pages without sidebar/search
  if (!isItemsPage && !isCategoriesPage && ~isSalesPage) {
    return (
      <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
        <Suspense fallback={<Loading />}>
          <DashBoardHeader />
        </Suspense>

        <main className="flex-1 overflow-y-auto">
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </main>

        <Suspense fallback={<Loading />}>
          <DashBoardFooter />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      {/* Header */}
      <Suspense fallback={<Loading />}>
        <DashBoardHeader />
      </Suspense>

      {/* Items Page */}
      {isItemsPage && (
        <div className="flex flex-col w-full h-full">
          {/* Mobile stacked */}
          <div className="flex flex-col md:hidden w-full h-full">
            <Suspense fallback={<Loading />}>
              <ItemsFilterBar />
            </Suspense>

            {/* SearchBar without padding */}
            <div className="w-full">
              <Suspense fallback={<Loading />}>
                <SearchBar />
              </Suspense>
            </div>

            {/* Divider line */}
            <div className="h-px w-full bg-gray-300" />

            <div className="flex-1 overflow-auto">
              <Outlet />
            </div>
          </div>

          {/* Desktop: search on top, sidebar left, main right */}
          <div className="hidden md:flex md:flex-col w-full h-full">
            {/* SearchBar without padding */}
            <div className="w-full bg-white shadow-sm border border-gray-200 py-6 px-4 md:px-6">
  <Suspense fallback={<Loading />}>
    <SearchBar />
  </Suspense>
</div>

            {/* Divider line below search bar */}
            <div className="h-px w-full bg-gray-300" />

            <div className="flex flex-1 w-full h-full overflow-hidden">
              {/* Sidebar left */}
              <div className="flex-shrink-0">
                <Suspense fallback={<Loading />}>
                  <ItemsFilterBar />
                </Suspense>
              </div>

              {/* Vertical divider line between sidebar and main */}
              <div className="w-px bg-gray-300" />

              {/* Main content */}
              <div className="flex-1 overflow-auto">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Categories Page */}
      {isCategoriesPage && (
        <div className="flex flex-col w-full h-full">
          {/* Mobile stacked */}
          <div className="md:hidden w-full">
            <div>
              <Suspense fallback={<Loading />}>
                <CategoryNavBar />
              </Suspense>
            </div>

            {/* Divider line */}
            <div className="h-px w-full bg-gray-300" />

            <div className="flex-1 overflow-auto">
              <Outlet />
            </div>
          </div>

          {/* Desktop: sidebar left, main right */}
          <div className="hidden md:flex flex-1 w-full h-full">
            <div className="flex-shrink-0">
              <Suspense fallback={<Loading />}>
                <CategoryNavBar />
              </Suspense>
            </div>

            {/* Vertical divider line */}
            <div className="w-px bg-gray-300" />

            <div className="flex-1 overflow-auto">
              <Outlet />
            </div>
          </div>
        </div>
      )}

      {/* Sale Pages */}
      {isSalesPage && (
        <div className="flex flex-col w-full h-full">
          {/* Mobile stacked */}
          <div className="md:hidden w-full">
            <div>
              <Suspense fallback={<Loading />}>
                <SaleNavBar />
              </Suspense>
            </div>

            {/* Divider line */}
            <div className="h-px w-full bg-gray-300" />

            <div className="flex-1 overflow-auto">
              <Outlet />
            </div>
          </div>

          {/* Desktop: sidebar left, main right */}
          <div className="hidden md:flex flex-1 w-full h-full">
            <div className="flex-shrink-0">
              <Suspense fallback={<Loading />}>
                <CategoryNavBar />
              </Suspense>
            </div>

            {/* Vertical divider line */}
            <div className="w-px bg-gray-300" />

            <div className="flex-1 overflow-auto">
              <Outlet />
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Suspense fallback={<Loading />}>
        <DashBoardFooter />
      </Suspense>
    </div>
  );
}

export default DashBoard;
