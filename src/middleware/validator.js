const validator = require("validator");
const crypt = require("bcrypt");
const db = require("../models/index");

const validateLoginBuyer = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and Password Required",
      });
    }

    const user = await db.buyer.findOne({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not Found",
      });
    }

    const isValidPassword = crypt.compareSync(
      password,
      user.dataValues.password
    );

    if (!isValidPassword) {
      return res.status(404).json({
        message: "Invalid Password",
      });
    }

    req.userData = user.dataValues;

    next();
  } catch (error) {
    res.status(500).json({
      message: "Server Error at validator",
      serverMessage: error,
    });
  }
};

const validateLoginSeller = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and Password Required",
      });
    }

    const user = await db.seller.findOne({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not Found",
      });
    }

    const isValidPassword = crypt.compareSync(
      password,
      user.dataValues.password
    );

    if (!isValidPassword) {
      return res.status(404).json({
        message: "Invalid Password",
      });
    }

    req.userData = user.dataValues;

    next();
  } catch (error) {
    res.status(500).json({
      message: "Server Error at validator",
      serverMessage: error,
    });
  }
};

const validatorCreateBuyer = async (req, res, next) => {
  try {
    const { name, birth, address, username, email, password, gender, phone } =
      req.body;

    if (
      !name ||
      !birth ||
      !address ||
      !username ||
      !email ||
      !password ||
      !gender ||
      !phone
    ) {
      return res.status(400).json({
        message: "Please fill all the field",
      });
    }

    const strongPassword = validator.isStrongPassword(password);
    if (!strongPassword) {
      return res.status(400).send({
        message: "password not strong",
      });
    }

    const isValidEmail = validator.isEmail(email, {
      host_blacklist: ["yopmail.com", "yohomail.com"],
    });

    if (!isValidEmail) {
      return res.status(400).send({
        message: "your email is invalid",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      message: "Server Error at validator",
      serverMessage: error,
    });
  }
};

const validatorCreateSeller = async (req, res, next) => {
  try {
    const { name, birth, address, username, email, password, gender, phone } =
      req.body;

    if (
      !name ||
      !birth ||
      !address ||
      !username ||
      !email ||
      !password ||
      !gender ||
      !phone
    ) {
      return res.status(400).json({
        message: "Please fill all the field",
      });
    }

    const strongPassword = validator.isStrongPassword(password);
    if (!strongPassword) {
      return res.status(400).send({
        message: "password not strong",
      });
    }

    const isValidEmail = validator.isEmail(email, {
      host_blacklist: ["yopmail.com", "yohomail.com"],
    });

    if (!isValidEmail) {
      return res.status(400).send({
        message: "your email is invalid",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      message: "Server Error at validator",
      serverMessage: error,
    });
  }
};

module.exports = {
  validateLoginBuyer,
  validateLoginSeller,
  validatorCreateBuyer,
  validatorCreateSeller,
};
