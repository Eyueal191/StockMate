import Item from "../models/item.js";
import uploadSingleFile from "../utility/uploadSingleFile.js";
import Category  from "../models/category.js";
//1. Create a new item
const addItem = async (req, res, next) => {
  try {
    const itemData = JSON.parse(req.body.data);
    const file = req.file;
    const image = file ? await uploadSingleFile(file) : null;
    let existing = await Item.findOne({ name: itemData.name, description: itemData.description });
 if (existing) {
  return res.status(200).json({
    message: "Item already exist, go to update it's stock",
    success: true,
    error: false,
  });
}
    const category = await Category.findOne({name:itemData.category});
    const payload = image ? {image, category:category._id}:{category:category._id}
    const item = await Item.create({ ...itemData,...payload});
    res.status(200).json({
      message: "Item added successfully",
      success: true,
      error: false,
      item
    });
  } catch (error) {
    next(error);
  }
};
// 2. Get all items (filtered by categories if provided)
const getItems = async (req, res, next) => {
  try {
  const {search } = req.query;    // assuming POST request with JSON body
  const categories = req.query.categories ? JSON.parse(req.query.categories) : [];
    // Loop over categories and replace names with IDs
    if (categories && categories.length > 0) {
      for (let i = 0; i < categories.length; i++) {
        const category = await Category.findOne({ name: categories[i] });
        if (category) {
          categories[i] = category._id; // replace name with ID
        } else {
          // remove invalid category names
          categories.splice(i, 1);
          i--; // adjust index after removing
        }
      }
    }

    const query = {};

    // Search by name or description
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }
    // Filter by categories
    if (categories && categories.length > 0) {
      query.category = { $in: categories };
    }
    // Fetch items from the database
    const items = await Item.find(query).populate("category", "name");
    res.status(200).json({
      message: "Items filtered successfully",
      success: true,
      error: false,
      items,
    });
  } catch (error) {
    next(error);
  }
};
// 3. Get a single item by ID
const getItemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id).populate("category", "name"); // Use findById for clarity
    if (!item) {
      return res.status(404).json({
        message: "Item not found",
        error: true,
        success: false
      });
    };
    res.status(200).json({
      message: "Item has been retrieved successfully",
      success: true,
      error: false,
      item
    });
  } catch (error) {
    next(error);
  }
};
// 4. update Item
const updateItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data  =  JSON.parse(req.body.data);
    console.log("data")
    if (data.category) {
      const categoryDoc = await Category.findOne({ name: data.category });
      if (categoryDoc) data.category = categoryDoc._id;
    }

    const item = await Item.findById(id).populate("category", "name");
    if (!item) return res.status(404).json({ message: "Item not found", success: false, error: true });

    const file = req.file;
    const image = file ? await uploadSingleFile(file) : item.image;

    Object.assign(item, data, { image });
    await item.save();

    res.status(200).json({
      message: `Item updated successfully`,
      success: true,
      error: false,
      updatedItem: item
    });
  } catch (error) {
    next(error);
  }
};
//5. Delete an item by ID
const deleteItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({
        message: "Item not found",
        success: false,
        error: true,
      });
    }

    res.status(200).json({
      message: "The item has been deleted successfully",
      success: true,
      error: false,
      deletedItem
    });
  } catch (error) {
    next(error);
  }
};
export {
  addItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem
};
