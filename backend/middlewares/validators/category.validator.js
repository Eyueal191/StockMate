import { body, param } from "express-validator";
import Category from "../models/category.js";

/* ============================
   📌 Add Category Validator
   ============================ */
export const addCategoryValidator = [
  body("name")
    .notEmpty().withMessage("Category name is required")
    .isLength({ min: 2 }).withMessage("Category name must be at least 2 characters long")
    .custom(async (value) => {
      const exists = await Category.findOne({ name: value });
      if (exists) {
        throw new Error("Category name already exists");
      }
      return true;
    }),
];

/* ============================
   📌 Update Category Validator
   ============================ */
export const updateCategoryValidator = [
  // validate :id
  param("id")
    .isMongoId()
    .withMessage("Invalid category ID"),

  // validate name
  body("name")
    .optional()
    .isLength({ min: 2 })
    .withMessage("Category name must be at least 2 characters long")
    .custom(async (value, { req }) => {
      if (!value) return true;

      const exists = await Category.findOne({
        name: value,
        _id: { $ne: req.params.id }, // ignore itself
      });

      if (exists) {
        throw new Error("Category name already exists");
      }

      return true;
    }),
];
