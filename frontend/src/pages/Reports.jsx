import { useState, useEffect } from "react";

function Reports() {
  const [purchases, setPurchases] = useState([]);
const [sales, setSales] = useState([]);
const [expenses, setExpenses] = useState([]);

useEffect(() => {
  fetchData();
}, []);

const fetchData = async () => {
  try {
    const purchasesRes = await fetch(
      "http://https://bikkina-erp-production.up.railway.app:5000/api/purchases"
    );
    const salesRes = await fetch(
      "http://https://bikkina-erp-production.up.railway.app:5000/api/sales"
    );
    const expensesRes = await fetch(
      "http://https://bikkina-erp-production.up.railway.app:5000/api/expenses"
    );

    const purchasesData =
      await purchasesRes.json();
    const salesData =
      await salesRes.json();
    const expensesData =
      await expensesRes.json();

    setPurchases(purchasesData);
    setSales(salesData);
    setExpenses(expensesData);
  } catch (error) {
    console.error(error);
  }
};

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // Monthly Data
  const monthlyPurchases = purchases
    .filter((item) => {
      const date = new Date(item.date);
      return (
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      );
    })
    .reduce(
      (sum, item) =>
        sum + Number(item.totalAmount || 0),
      0
    );

  const monthlySales = sales
    .filter((item) => {
      const date = new Date(item.date);
      return (
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      );
    })
    .reduce(
      (sum, item) =>
        sum + Number(item.totalAmount || 0),
      0
    );

  const monthlyExpenses = expenses
    .filter((item) => {
      const date = new Date(item.date);
      return (
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      );
    })
    .reduce(
      (sum, item) =>
        sum + Number(item.amount || 0),
      0
    );

  const monthlyProfit =
    monthlySales -
    monthlyPurchases -
    monthlyExpenses;

  // Yearly Data
  const yearlyPurchases = purchases
    .filter(
      (item) =>
        new Date(item.date).getFullYear() ===
        currentYear
    )
    .reduce(
      (sum, item) =>
        sum + Number(item.totalAmount || 0),
      0
    );

  const yearlySales = sales
    .filter(
      (item) =>
        new Date(item.date).getFullYear() ===
        currentYear
    )
    .reduce(
      (sum, item) =>
        sum + Number(item.totalAmount || 0),
      0
    );

  const yearlyExpenses = expenses
    .filter(
      (item) =>
        new Date(item.date).getFullYear() ===
        currentYear
    )
    .reduce(
      (sum, item) =>
        sum + Number(item.amount || 0),
      0
    );

  const yearlyProfit =
    yearlySales -
    yearlyPurchases -
    yearlyExpenses;

  // Date Range Filter
  const filteredPurchases = purchases.filter(
    (item) => {
      if (!fromDate || !toDate) return true;

      const date = new Date(item.date);

      return (
        date >= new Date(fromDate) &&
        date <= new Date(toDate)
      );
    }
  );

  const filteredSales = sales.filter((item) => {
    if (!fromDate || !toDate) return true;

    const date = new Date(item.date);

    return (
      date >= new Date(fromDate) &&
      date <= new Date(toDate)
    );
  });

  const filteredExpenses = expenses.filter(
    (item) => {
      if (!fromDate || !toDate) return true;

      const date = new Date(item.date);

      return (
        date >= new Date(fromDate) &&
        date <= new Date(toDate)
      );
    }
  );

  const rangePurchases =
    filteredPurchases.reduce(
      (sum, item) =>
        sum + Number(item.totalAmount || 0),
      0
    );

  const rangeSales = filteredSales.reduce(
    (sum, item) =>
      sum + Number(item.totalAmount || 0),
    0
  );

  const rangeExpenses =
    filteredExpenses.reduce(
      (sum, item) =>
        sum + Number(item.amount || 0),
      0
    );

  const rangeProfit =
    rangeSales -
    rangePurchases -
    rangeExpenses;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">
        Reports
      </h1>

      {/* This Month */}

      <h2 className="text-2xl font-bold mb-4">
        This Month
      </h2>

      <div className="grid grid-cols-4 gap-6 mb-10">

        <div className="bg-gray-900 p-6 rounded-xl">
          <h3>Purchased</h3>
          <p className="text-3xl text-blue-400 mt-3">
  ₹{Math.round(monthlyPurchases).toLocaleString("en-IN")}
</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl">
          <h3>Sold</h3>
          <p className="text-3xl text-green-400 mt-3">
  ₹{Math.round(monthlySales).toLocaleString("en-IN")}
</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl">
          <h3>Spent</h3>
          <p className="text-3xl text-red-400 mt-3">
  ₹{Math.round(monthlyExpenses).toLocaleString("en-IN")}
</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl">
          <h3>Profit</h3>
          <p className="text-3xl text-yellow-400 mt-3">
  ₹{Math.round(monthlyProfit).toLocaleString("en-IN")}
</p>
        </div>

      </div>

      {/* Date Range */}

      <div className="bg-gray-900 p-6 rounded-xl mb-10">

        <h2 className="text-2xl font-bold mb-5">
          Custom Date Range
        </h2>

        <div className="flex gap-4 mb-6">

          <input
            type="date"
            value={fromDate}
            onChange={(e) =>
              setFromDate(e.target.value)
            }
            className="bg-gray-800 p-3 rounded"
          />

          <input
            type="date"
            value={toDate}
            onChange={(e) =>
              setToDate(e.target.value)
            }
            className="bg-gray-800 p-3 rounded"
          />

        </div>

        <div className="grid grid-cols-4 gap-4">

          <div className="bg-gray-800 p-4 rounded">
            <h3>Purchases</h3>
            <p className="text-blue-400 text-2xl">
              ₹{Math.round(rangePurchases).toLocaleString("en-IN")}
            </p>
          </div>

          <div className="bg-gray-800 p-4 rounded">
            <h3>Sales</h3>
            <p className="text-green-400 text-2xl">
              ₹{Math.round(rangeSales).toLocaleString("en-IN")}
            </p>
          </div>

          <div className="bg-gray-800 p-4 rounded">
            <h3>Expenses</h3>
            <p className="text-red-400 text-2xl">
              ₹{Math.round(rangeExpenses).toLocaleString("en-IN")}
            </p>
          </div>

          <div className="bg-gray-800 p-4 rounded">
            <h3>Profit</h3>
            <p className="text-yellow-400 text-2xl">
              ₹{Math.round(rangeProfit).toLocaleString("en-IN")}
            </p>
          </div>

        </div>

      </div>

      {/* This Year */}

      <h2 className="text-2xl font-bold mb-4">
        This Year
      </h2>

      <div className="grid grid-cols-4 gap-6">

        <div className="bg-gray-900 p-6 rounded-xl">
          <h3>Purchased</h3>
          <p className="text-3xl text-blue-400 mt-3">
            ₹{Math.round(yearlyPurchases).toLocaleString("en-IN")}
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl">
          <h3>Sold</h3>
          <p className="text-3xl text-green-400 mt-3">
            ₹{Math.round(yearlySales).toLocaleString("en-IN")}
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl">
          <h3>Spent</h3>
          <p className="text-3xl text-red-400 mt-3">
            ₹{Math.round(yearlyExpenses).toLocaleString("en-IN")}
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl">
          <h3>Profit</h3>
          <p className="text-3xl text-yellow-400 mt-3">
            ₹{Math.round(yearlyProfit).toLocaleString("en-IN")}
          </p>
        </div>

      </div>
    </div>
  );
}

export default Reports;