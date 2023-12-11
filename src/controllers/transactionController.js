const db = require("../models");

const createTransaction = async (req, res) => {
  const { product_id, buyer_id, date_order, quantity, total_price } = req.body;

  if (!product_id || !buyer_id || !date_order || !quantity || !total_price) {
    return res.status(400).send({
      message: "Please fill all the field",
    });
  } else {
    try {
      const transaction = await db.transaction.create({
        product_id,
        buyer_id,
        date_order,
        quantity,
        total_price,
      });

      res.status(201).json({
        message: "transaction created successfully",
        data: transaction,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
};

// For Admin
const getAllTransaction = async (req, res) => {
  try {
    const transaction = await db.transaction.findAll();

    res.status(200).json({
      message: "Get all transaction successfully",
      data: transaction,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// For User
const getTransactionbyBuyer = async (req, res) => {
  const { id } = req.params;

  try {
    const transaction = await db.transaction.findAll({
      where: {
        buyer_id: id,
      },
    });

    // Check if any transactions found
    const response = transaction.length
      ? {
          message: "Get transaction by buyer successfully",
          data: transaction,
        }
      : {
          message: "Transaction not found",
          data: null,
        };

    res.status(transaction.length ? 200 : 404).json(response);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const updateTransaction = async (req, res) => {
  const { tr_id } = req.body;

  try {
    const transaction = await db.transaction.update(
      {
        status: "Success",
      },
      {
        where: {
          id: tr_id,
        },
      }
    );

    res.status(200).json({
      message: "Transaction updated successfully",
      data: transaction,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const deleteTransaction = async (req, res) => {
  const { tr_id } = req.body;

  try {
    const transaction = await db.transaction.destroy({
      where: {
        id: tr_id,
      },
    });

    res.status(200).json({
      message: "Transaction deleted successfully",
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTransaction,
  getAllTransaction,
  getTransactionbyBuyer,
};
