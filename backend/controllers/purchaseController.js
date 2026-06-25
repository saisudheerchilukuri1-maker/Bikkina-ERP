const Purchase = require("../models/Purchase");

const getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find();

    res.json(purchases);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addPurchase = async (req, res) => {
  try {
    const purchase =
      await Purchase.create(req.body);

    res.status(201).json(purchase);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deletePurchase = async (req, res) => {
  try {
    await Purchase.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Purchase Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const updatePurchase = async (req, res) => {
  try {
    const purchase =
      await Purchase.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(purchase);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  getPurchases,
  addPurchase,
  deletePurchase,
  updatePurchase,
};