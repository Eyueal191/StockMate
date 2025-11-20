import {
    addCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} from "../controllers/category.controllers.js";

import express from "express";
const categoryRoutes = express.Router();
categoryRoutes.post("/categories", addCategory);
categoryRoutes.get("/categories", getCategories);
categoryRoutes.get("/categories/:id", getCategoryById);
categoryRoutes.put("/categories/:id", updateCategory);
categoryRoutes.delete("/categories/:id", deleteCategory);
export default categoryRoutes;
