const Expense = require("../models/Expense");

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addExpense = async (req, res) => {
  try {
    const expense = await Expense.create(req.body);

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Expense Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateExpense = async (req, res) => {
  try {
    const expense =
      await Expense.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(expense);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
};
