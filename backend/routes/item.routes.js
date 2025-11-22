import express from "express";
import {
  addItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} from "../controllers/item.controllers.js";
import upload from "../config/multer.js"
const itemRoutes = express.Router();

// 1. Create a new item
itemRoutes.post("/",upload.single("image"), addItem);

// 2. Get all items
itemRoutes.get("/", getItems);

// 3. Get item by ID
itemRoutes.get("/:id", getItemById);

// 4. Update an item by ID
itemRoutes.put("/:id", updateItem);

// 5. Delete an item by ID
itemRoutes.delete("/:id", deleteItem);

export default itemRoutes;
