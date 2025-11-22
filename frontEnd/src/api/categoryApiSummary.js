// categoryApiSummary.js

const categoryApiSummary = {
  baseURL: "http://localhost:8000",
  endpoints: {
    createCategory: {
      method: "POST",
      url: "/api/category/categories",
      description: "Create a new category"
    },

    getAllCategories: {
      method: "GET",
      url: "/api/category/categories",
      description: "Get all categories"
    },

    getCategoryById: {
      method: "GET",
      url: "/api/category/categories/:id",
      description: "Get a single category by ID"
    },

    updateCategory: {
      method: "PUT",
      url: "/api/category/categories/:id",
      description: "Update a category by ID"
    },

    deleteCategory: {
      method: "DELETE",
      url: "/api/category/categories/:id",
      description: "Delete a category by ID"
    }
  }
};

export default categoryApiSummary;
