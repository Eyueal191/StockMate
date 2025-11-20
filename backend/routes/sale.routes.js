import express from "express";
import { addSale, getSales, updateSale, deleteSale, getSaleById } from "../controllers/sale.controllers.js";

const saleRoutes = express.Router();

// Create a new sale
saleRoutes.post("/", addSale);

// Get all sales
saleRoutes.get("/", getSales);

// Get single sale by ID
saleRoutes.get("/:id", getSaleById);

// Update sale by ID
saleRoutes.put("/:id", updateSale);

// Delete sale by ID
saleRoutes.delete("/:id", deleteSale);

export default saleRoutes;
