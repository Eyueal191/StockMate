// reportApiSummary.js
const reportApiSummary = {
  baseURL: "http://localhost:8000",
  endpoints: {
    salesByItem: {
      method: "GET",
      url: "/api/report/sales-by-item",
      description: "Get aggregated sales by each item"
    },

    salesByDate: {
      method: "GET",
      url: "/api/report/sales-by-date",
      description: "Get aggregated sales grouped by date"
    },

    salesByCategory: {
      method: "GET",
      url: "/api/report/sales-by-category",
      description: "Get aggregated sales grouped by product category"
    },

    salesOverview: {
      method: "GET",
      url: "/api/report/sales-overview",
      description: "Get an overview of total sales, total revenue, and other summary stats"
    },

    topItems: {
      method: "GET",
      url: "/api/report/top-items",
      description: "Get top-selling items"
    },

    lowStockItems: {
      method: "GET",
      url: "/api/report/low-stock-items",
      description: "Get items that are low in stock"
    },

    salesComparison: {
      method: "GET",
      url: "/api/report/sales-comparison",
      description: "Compare sales between two periods"
    },

    revenueAnalytics: {
      method: "GET",
      url: "/api/report/revenue-analytics",
      description: "Get revenue analytics such as total revenue, average order value, and trends"
    }
  }
};
export default reportApiSummary;
