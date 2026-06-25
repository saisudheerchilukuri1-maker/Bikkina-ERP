const Purchase = require("../models/Purchase");
const Sale = require("../models/Sale");
const Expense = require("../models/Expense");

const getDashboardStats = async (req, res) => {
  try {
    const purchases = await Purchase.find();
    const sales = await Sale.find();
    const expenses = await Expense.find();

    const totalPurchases = purchases.reduce(
      (sum, item) => sum + Number(item.totalAmount || 0),
      0
    );

    const totalPaidPurchases = purchases.reduce(
      (sum, item) => sum + Number(item.paidAmount || 0),
      0
    );

    const totalPendingPurchases = purchases.reduce(
      (sum, item) => sum + Number(item.pendingAmount || 0),
      0
    );

    const totalSales = sales.reduce(
      (sum, item) => sum + Number(item.totalAmount || 0),
      0
    );

    const totalReceivedSales = sales.reduce(
      (sum, item) => sum + Number(item.receivedAmount || 0),
      0
    );

    const totalPendingSales = sales.reduce(
      (sum, item) => sum + Number(item.pendingAmount || 0),
      0
    );

    const totalExpenses = expenses.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );
    // Total Purchase Quantity
const totalPurchaseQty = purchases.reduce(
  (sum, item) => sum + Number(item.quantity || 0),
  0
);

// Total Sold Quantity
const totalSoldQty = sales.reduce(
  (sum, item) => sum + Number(item.quantity || 0),
  0
);

// Current Stock
const currentStock =
  totalPurchaseQty - totalSoldQty;

// Today's Date
const today = new Date().toISOString().split("T")[0];

// Today's Purchase Amount
const todaysPurchases = purchases
  .filter(item => item.date === today)
  .reduce(
    (sum, item) =>
      sum + Number(item.totalAmount || 0),
    0
  );

// Today's Sales Amount
const todaysSales = sales
  .filter(item => item.date === today)
  .reduce(
    (sum, item) =>
      sum + Number(item.totalAmount || 0),
    0
  );

// Today's Expenses
const todaysExpenses = expenses
  .filter(item => item.date === today)
  .reduce(
    (sum, item) =>
      sum + Number(item.amount || 0),
    0
  );

    const grossProfit =
      totalSales - totalPurchases;

    const netProfit =
      totalSales -
      totalPurchases -
      totalExpenses;

    res.json({
      totalPurchases,
      totalPaidPurchases,
      totalPendingPurchases,

      totalSales,
      totalReceivedSales,
      totalPendingSales,

      totalExpenses,

      grossProfit,
      netProfit,
      totalPurchaseQty,
totalSoldQty,
currentStock,

todaysPurchases,
todaysSales,
todaysExpenses,

      purchaseCount: purchases.length,
      salesCount: sales.length,
      expenseCount: expenses.length,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
    
  }
};
module.exports = {
  getDashboardStats,
};