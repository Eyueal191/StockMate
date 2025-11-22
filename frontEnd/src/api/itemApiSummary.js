// itemApiSummary.js

const itemApiSummary = {
  baseURL: "http://localhost:8000",
  endpoints: {
    createItem: {
      method: "POST",
      url: "/api/item/",
      description: "Create a new item"
    },

    getAllItems: {
      method: "GET",
      url: "/api/item/",
      description: "Get all items"
    },

    getItemById: {
      method: "GET",
      url: "/api/item/:id",
      description: "Get a single item by ID"
    },

    updateItem: {
      method: "PUT",
      url: "/api/item/:id",
      description: "Update an item by ID"
    },

    deleteItem: {
      method: "DELETE",
      url: "/api/item/:id",
      description: "Delete an item by ID"
    },

    getItemsByCategory: {
      method: "GET",
      url: "/api/item/category/:categoryId",
      description: "Get items filtered by category"
    }
  }
};

export default itemApiSummary;
