const Sale = require("../models/Sale");

const getSales = async (req, res) => {
  try {
    const sales = await Sale.find();
    res.json(sales);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addSale = async (req, res) => {
  try {
    const sale = await Sale.create(req.body);

    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteSale = async (req, res) => {
  try {
    await Sale.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Sale Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateSale = async (req, res) => {
  try {
    const sale =
      await Sale.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(sale);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getSales,
  addSale,
  deleteSale,
  updateSale,
};
