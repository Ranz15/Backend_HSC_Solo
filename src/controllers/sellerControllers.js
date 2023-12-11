const db = require("../models");
const bcrypt = require("bcrypt");

const createSeller = async (req, res) => {
  const { name, birth, address, username, email, password, gender, phone } =
    req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const seller = await db.seller.create({
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
      message: "Seller created successfully",
      data: seller,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getAllSeller = async (req, res) => {
  try {
    const seller = await db.seller.findAll();

    res.status(200).json({
      message: "Get all seller successfully",
      data: seller,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getSellerbyID = async (req, res) => {
  const { id } = req.params;

  try {
    const seller = await db.seller.findOne({
      where: {
        id: id,
      },
    });

    if (!seller) {
      return res.status(404).json({
        message: "Seller not found",
      });
    }

    res.status(200).json({
      message: "Get seller by id successfully",
      data: seller,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const updateSellerbyID = async (req, res) => {
  const { id } = req.params;
  const { name, birth, address, username, email, password, gender, phone } =
    req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const seller = await db.seller.update(
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

    if (!seller[0]) {
      return res.status(404).json({
        message: "Seller not found",
      });
    }

    res.status(200).json({
      message: "Seller updated successfully",
      data: seller,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const deleteSellerByID = async (req, res) => {
  const { id } = req.params;

  try {
    const seller = await db.seller.destroy({
      where: {
        id: id,
      },
    });

    if (!seller) {
      return res.status(404).json({
        message: "Seller not found",
      });
    }

    res.status(200).json({
      message: "Seller deleted successfully",
      data: seller,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  createSeller,
  getAllSeller,
  getSellerbyID,
  updateSellerbyID,
  deleteSellerByID,
};
