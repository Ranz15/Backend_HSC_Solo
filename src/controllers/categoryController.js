const db = require("../models");

const createCategory = async (req, res) => {
  const { name_category } = req.body;

  if (!name_category) {
    return res.status(400).json({
      message: "Please fill all the field",
    });
  }

  try {
    const category = await db.categories.create({
      categoryName: name_category,
    });

    res.status(201).json({
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const category = await db.categories.findAll();

    res.status(200).json({
      message: "Get all category successfully",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await db.categories.findOne({
      where: {
        id: id,
      },
    });

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json({
      message: "Get category by id successfully",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const updateCategoryById = async (req, res) => {
  const { id } = req.params;
  const { name_category } = req.body;

  try {
    const category = await db.categories.update(
      {
        categoryName: name_category,
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (!category[0]) {
      return res.status(404).json({
        message: "Category not found",
      });
    } else {
      res.status(200).json({
        message: "Category updated successfully",
        data: category,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const deleteCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await db.categories.destroy({
      where: {
        id: id,
      },
    });

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  createCategory,
  getAllCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById
};
