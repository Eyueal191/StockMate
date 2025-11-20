// saleApiSummary.js
const saleApiSummary = {
  baseURL: "http://localhost:8000",
  endpoints: {
    addSale: {
      method: "POST",
      url: "/api/sale/",
      description: "Create a new sale",
      requestBodyExample: {
        item: "Laptop",
        qty: 2
      },
      responseExample: {
        message: "This is AddSale EndPoint",
        error: false,
        success: true
      }
    },

    getSales: {
      method: "GET",
      url: "/api/sale/",
      description: "Get all sales",
      responseExample: [
        { id: "1", item: "Laptop", qty: 2 },
        { id: "2", item: "Phone", qty: 5 },
        { id: "34", item: "Headphones", qty: 10 }
      ]
    },

    getSaleById: {
      method: "GET",
      url: "/api/sale/:id",
      description: "Get a single sale by ID",
      exampleURL: "/api/sale/34",
      responseExample: {
        message: "Sale found",
        error: false,
        success: true,
        data: { id: "34", item: "Headphones", qty: 10 }
      }
    },

    updateSale: {
      method: "PUT",
      url: "/api/sale/:id",
      description: "Update a sale by ID",
      exampleURL: "/api/sale/34",
      requestBodyExample: {
        item: "Laptop",
        qty: 3
      },
      responseExample: {
        message: "This is UpdateSale EndPoint",
        error: false,
        success: true
      }
    },

    deleteSale: {
      method: "DELETE",
      url: "/api/sale/:id",
      description: "Delete a sale by ID",
      exampleURL: "/api/sale/34",
      responseExample: {
        message: "This is DeleteSale EndPoint",
        error: false,
        success: true
      }
    }
  }
};

export default saleApiSummary;
