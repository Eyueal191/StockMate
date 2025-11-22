import express from "express";
import {
  getSalesByItem,
  getSalesByDate,
  getSalesByCategory,
  getSalesOverview,
  getTopItems,
  getLowStockItems,
  getRevenueAnalytics,
} from "../controllers/report.controllers.js";

const reportRoutes = express.Router();

/* ------------------------------
   📌 ROUTES FOR ALL USERS (STAFF)
   ------------------------------ */

// General sales reports
reportRoutes.get("/sales-by-item", getSalesByItem);
reportRoutes.get("/sales-by-date", getSalesByDate);
reportRoutes.get("/sales-by-category", getSalesByCategory);

// Inventory checks
reportRoutes.get("/top-items", getTopItems);
reportRoutes.get("/low-stock-items", getLowStockItems);


/* ------------------------------
   🔒 ADMIN-ONLY REPORTS
   ------------------------------ */

// Financial summary & business KPIs
reportRoutes.get("/sales-overview", getSalesOverview);

// Revenue, profit, and advanced analytics
reportRoutes.get("/revenue-analytics", getRevenueAnalytics);

export default reportRoutes;
