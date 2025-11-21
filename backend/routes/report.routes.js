import express from "express";
import {
  getSalesByItem,
  getSalesByDate,
  getSalesByCategory,
  getSalesOverview,
  getTopItems,
  getLowStockItems,
  getSalesComparison,
  getRevenueAnalytics,
} from "../controllers/report.controllers.js";

const reportRoutes = express.Router();

// Sales Reports
reportRoutes.get("/sales-by-item", getSalesByItem);
reportRoutes.get("/sales-by-date", getSalesByDate);
reportRoutes.get("/sales-by-category", getSalesByCategory);
reportRoutes.get("/sales-overview", getSalesOverview);
reportRoutes.get("/top-items", getTopItems);
reportRoutes.get("/low-stock-items", getLowStockItems);
reportRoutes.get("/sales-comparison", getSalesComparison);
reportRoutes.get("/revenue-analytics", getRevenueAnalytics);

export default reportRoutes;
