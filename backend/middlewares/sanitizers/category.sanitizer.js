import { body } from "express-validator";

// ========== Sanitizer for Add Category ==========
export const addCategorySanitizer = [
  body("name")
    .trim()
    .escape(),
];

// ========== Sanitizer for Update Category ==========
export const updateCategorySanitizer = [
  body("name")
    .optional()
    .trim()
    .escape(),
];
