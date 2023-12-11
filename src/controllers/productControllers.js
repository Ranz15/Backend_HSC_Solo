const db = require("../models");

const createProduct = async (req, res) => {
  const {
    name_product,
    category_id,
    seller_id,
    price,
    description,
    stock,
    thumbnail,
  } = req.body;

  if (
    !name_product ||
    !category_id ||
    !seller_id ||
    !price ||
    !description ||
    !stock
  ) {
    return res.status(400).json({
      message: "Please fill all the field",
    });
  } else {
    try {
      const product = await db.product.create({
        productName: name_product,
        category_id: category_id,
        seller_id: seller_id,
        price: price,
        description: description,
        stock: stock,
        thumbnail: thumbnail,
      });

      res.status(201).json({
        message: "product created successfully",
        data: product,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
};

const getAllProduct = async (req, res) => {
  try {
    const product = await db.product.findAll();
    res.status(200).json({
      message: "product created successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getAllProductbycategory = async (req, res) => {
  const { nama } = req.params;

  try {
    const product = await db.product.findAll({
      include: {
        model: db.categories,
        where: {
          categoryName: nama,
        },
      },
    });

    if (!product[0]) {
      return res.status(404).json({
        message: "Product not found",
      });
    } else {
      res.status(200).json({
        message: "Get product by category successfully",
        data: product,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await db.product.findOne({
      where: {
        id: id,
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    } else {
      res.status(200).json({
        message: "Get product by id successfully",
        data: product,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const updateProductById = async (req, res) => {
  const {
    name_product,
    category_id,
    seller_id,
    price,
    description,
    stock,
    thumbnail,
  } = req.body;
  const { id } = req.params;

  try {
    const product = await db.product.update(
      {
        productName: name_product,
        category_id: category_id,
        seller_id: seller_id,
        price: price,
        description: description,
        stock: stock,
        thumbnail: thumbnail,
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (!product[0]) {
      return res.status(404).json({
        message: "Product not found",
      });
    } else {
      res.status(200).json({
        message: "Product updated successfully",
        data: product,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const deleteProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await db.product.destroy({
      where: {
        id: id,
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    } else {
      res.status(200).json({
        message: "Product deleted successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getAllProduct,
  getAllProductbycategory,
  getProductById,
  updateProductById,
  deleteProductById,
};
