import express from "express";
import {
  addCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from "../controllers/category.controllers.js";
import {authenticateUser, authorizeAdmin} from "../middlewares/auth.js";

const categoryRoutes = express.Router();

// Create a category
categoryRoutes.post("/categories",authenticateUser, addCategory);

// Get all categories
categoryRoutes.get("/categories",authenticateUser, getCategories);

// Get category by ID
categoryRoutes.get("/categories/:id",authenticateUser, getCategoryById);

// Update category
categoryRoutes.put("/categories/:id",authenticateUser, updateCategory);

// Delete category
categoryRoutes.delete("/categories/:id",authenticateUser, deleteCategory);

export default categoryRoutes;
