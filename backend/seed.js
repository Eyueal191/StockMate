import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js"; // your DB connection file
import Sale from "./models/Sale.js";
import Item from "./models/Item.js";

dotenv.config();

const seedSales = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Body Care products
    const products = [
      "Nivea Body Lotion",
      "The Body Shop Body Scrub",
      "Dove Shower Gel",
      "L'Occitane Hand Cream",
      "Burt's Bees Foot Cream"
    ];

    // Find items in the database
    const items = await Item.find({ name: { $in: products } });

    if (!items || items.length === 0) {
      console.log("No items found in DB. Please insert products first.");
      process.exit();
    }

    // Create sample sales
    const salesData = [
      {
        item: items.find(p => p.name === "Nivea Body Lotion")._id,
        quantity: 5,
        seller: "Eyueal",
        date: new Date("2025-12-05")
      },
      {
        item: items.find(p => p.name === "The Body Shop Body Scrub")._id,
        quantity: 4,
        seller: "Eyueal",
        date: new Date("2025-12-06")
      },
      {
        item: items.find(p => p.name === "Dove Shower Gel")._id,
        quantity: 6,
        seller: "Eyueal",
        date: new Date("2025-12-07")
      },
      {
        item: items.find(p => p.name === "L'Occitane Hand Cream")._id,
        quantity: 3,
        seller: "Eyueal",
        date: new Date("2025-12-08")
      },
      {
        item: items.find(p => p.name === "Burt's Bees Foot Cream")._id,
        quantity: 2,
        seller: "Eyueal",
        date: new Date("2025-12-09")
      }
    ];

    await Sale.insertMany(salesData);

    console.log("Sample Body Care sales seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding sales:", error);
    process.exit(1);
  }
};

seedSales();
