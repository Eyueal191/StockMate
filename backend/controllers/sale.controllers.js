import Sale from "../models/sale.js"
import Item from "../models/item.js"
import Category from "../models/category.js"
// 1. addSale.
const addSale = async (req, res, next) => {
  try {
    const data = req.body; // data = {name, quantity, seller}
    // Find the item by name (case-insensitive)
    let item = await Item.findOne({ name: { $regex: data.name, $options: "i" } });
    if (!item) {
      return res.status(404).json({
        message: "Please provide the correct product name",
        error: true,
        success: false
      });
    }

    // Deduct from stock
    if (item.stock < data.quantity) {
      return res.status(400).json({
        message: "Insufficient stock",
        error: true,
        success: false
      });
    }
    item.stock -= Number(data.quantity);
    await item.save();
    // Create sale
    let soldItem = await Sale.create({
      ...data,
      item: item._id,      // store the item reference
    });

    return res.status(201).json({
      message: "This sale has been recorded successfully",
      error: false,
      success: true,
      soldItem
    });
  } catch (error) {
    next(error);
  }
};
// 2. getSales
const getSales = async (req, res, next) => {
  try {
    const { seller, upperDate, lowerDate } = req.query;

    // Build the query object
    let query = {};

    if (seller) {
      query.seller = seller;
    }

    if (lowerDate || upperDate) {
      query.date = {};
      if (lowerDate) query.date.$gte = new Date(lowerDate);
      if (upperDate) query.date.$lte = new Date(upperDate);
    }

    // Fetch sales with only item name and price populated
    const sales = await Sale.find(query)
      .populate("item", "name price image");  // only populate item name and price

    return res.status(200).json({
      message: "Sales fetched successfully",
      error: false,
      success: true,
      data: sales
    });

  } catch (error) {
    next(error);
  }
};
// 3. getSaleById
const getSaleById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Fetch the sale and populate item name & price
    const soldItem = await Sale.findById(id).populate("item", "name price image");

    if (!soldItem) {
      return res.status(404).json({
        message: "Sale record not found",
        error: true,
        success: false
      });
    }

    return res.status(200).json({
      message: "Sale record retrieved successfully",
      success: true,
      error: false,
      data: soldItem
    });

  } catch (error) {
    next(error);
  }
};


const updateSale = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body; // data to update (e.g., quantity, item, seller)

    // Find the sale by ID and update it
    const updatedSale = await Sale.findByIdAndUpdate(id, updateData, {
      new: true,           // return the updated document
      runValidators: true, // ensure schema validations
    }).populate("item", "name price"); // populate item info

    if (!updatedSale) {
      return res.status(404).json({
        message: "Sale record not found",
        error: true,
        success: false
      });
    }

    return res.status(200).json({
      message: "Sale record updated successfully",
      success: true,
      error: false,
      data: updatedSale
    });
  } catch (error) {
    next(error);
  }
};
// 5. deleteSale
const deleteSale = async (req, res, next) => {
  try {
    const { id } = req.params; // get the sale ID from the URL
    const deletedSale = await Sale.findByIdAndDelete(id);

    if (!deletedSale) {
      return res.status(404).json({
        message: "Sale record not found",
        error: true,
        success: false
      });
    }

    return res.status(200).json({
      message: "Sale record deleted successfully",
      success: true,
      error: false,
      data: deletedSale
    });
  } catch (error) {
    next(error);
  }
};

export { addSale, getSales, getSaleById, updateSale, deleteSale };
