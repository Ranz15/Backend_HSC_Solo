const db = require("../models");
const bcrypt = require("bcrypt");

const createBuyer = async (req, res) => {
  const { name, birth, address, username, email, password, gender, phone } =
    req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const buyer = await db.buyer.create({
      fullName: name,
      dateofBirth: birth,
      address: address,
      username: username,
      email: email,
      password: hashedPassword,
      gender: gender,
      phone_number: phone,
    });

    res.status(201).json({
      message: "Buyer created successfully",
      data: buyer,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getAllBuyer = async (req, res) => {
  try {
    const buyer = await db.buyer.findAll();

    res.status(200).json({
      message: "Get all buyer successfully",
      data: buyer,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getBuyerById = async (req, res) => {
  const { id } = req.params;

  try {
    const buyer = await db.buyer.findOne({
      where: {
        id: id,
      },
    });

    if (!buyer) {
      return res.status(404).json({
        message: "Buyer not found",
      });
    }

    res.status(200).json({
      message: "Get buyer by id successfully",
      data: buyer,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const updateBuyerById = async (req, res) => {
  const { name, birth, address, username, email, password, gender, phone } =
    req.body;

  const { id } = req.params;

  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const buyer = await db.buyer.update(
      {
        fullName: name,
        dateofBirth: birth,
        address: address,
        username: username,
        email: email,
        password: hashedPassword,
        gender: gender,
        phone_number: phone,
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (!buyer[0]) {
      return res.status(404).json({
        message: "Buyer not found",
      });
    }

    res.status(200).json({
      message: "Buyer updated successfully",
      data: buyer,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const deleteBuyerById = async (req, res) => {
  const { id } = req.params;

  try {
    const buyer = await db.buyer.destroy({
      where: {
        id: id,
      },
    });

    if (!buyer) {
      return res.status(404).json({
        message: "Buyer not found",
      });
    }

    res.status(200).json({
      message: "Buyer deleted successfully",
      data: buyer,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  createBuyer,
  getAllBuyer,
  getBuyerById,
  updateBuyerById,
  deleteBuyerById,
};
