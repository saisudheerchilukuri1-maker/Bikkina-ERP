import { useEffect, useState } from "react";
const formatCurrency = (amount) => {
  return Number(amount || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  });
};
function Dashboard() {
  const [stats, setStats] = useState({
  totalPurchases: 0,
  totalPaidPurchases: 0,
  totalPendingPurchases: 0,

  totalSales: 0,
  totalReceivedSales: 0,
  totalPendingSales: 0,

  totalExpenses: 0,

  grossProfit: 0,
  netProfit: 0,

  purchaseCount: 0,
  salesCount: 0,
  expenseCount: 0,
  totalPurchaseQty: 0,
totalSoldQty: 0,
currentStock: 0,

todaysPurchases: 0,
todaysSales: 0,
todaysExpenses: 0,
});

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/dashboard"
      );

      const data = await response.json();

      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

  {/* PURCHASE */}

  <div className="bg-gray-900 p-6 rounded-xl">
    <h3 className="text-gray-400">Total Purchases</h3>
    <p className="text-3xl font-bold text-blue-400 mt-3">
      ₹{formatCurrency(stats.totalPurchases)}
    </p>
  </div>

  <div className="bg-gray-900 p-6 rounded-xl">
    <h3 className="text-gray-400">Paid To Suppliers</h3>
    <p className="text-3xl font-bold text-green-400 mt-3">
      ₹{formatCurrency(stats.totalPaidPurchases)}
    </p>
  </div>

  <div className="bg-gray-900 p-6 rounded-xl">
    <h3 className="text-gray-400">Pending To Suppliers</h3>
    <p className="text-3xl font-bold text-red-400 mt-3">
      ₹{formatCurrency(stats.totalPendingPurchases)}
    </p>
  </div>

  {/* SALES */}

  <div className="bg-gray-900 p-6 rounded-xl">
    <h3 className="text-gray-400">Total Sales</h3>
    <p className="text-3xl font-bold text-blue-400 mt-3">
      ₹{formatCurrency(stats.totalSales)}
    </p>
  </div>

  <div className="bg-gray-900 p-6 rounded-xl">
    <h3 className="text-gray-400">Received From Customers</h3>
    <p className="text-3xl font-bold text-green-400 mt-3">
      ₹{formatCurrency(stats.totalReceivedSales)}
    </p>
  </div>

  <div className="bg-gray-900 p-6 rounded-xl">
    <h3 className="text-gray-400">Pending From Customers</h3>
    <p className="text-3xl font-bold text-red-400 mt-3">
      ₹{formatCurrency(stats.totalPendingSales)}
    </p>
  </div>

  {/* STOCK */}

  <div className="bg-gray-900 p-6 rounded-xl">
    <h3 className="text-gray-400">Purchased Quantity</h3>
    <p className="text-3xl font-bold text-yellow-400 mt-3">
      {stats.totalPurchaseQty}
    </p>
  </div>

  <div className="bg-gray-900 p-6 rounded-xl">
    <h3 className="text-gray-400">Sold Quantity</h3>
    <p className="text-3xl font-bold text-orange-400 mt-3">
      {stats.totalSoldQty}
    </p>
  </div>

  <div className="bg-gray-900 p-6 rounded-xl">
    <h3 className="text-gray-400">Current Stock</h3>
    <p className="text-3xl font-bold text-purple-400 mt-3">
      {stats.currentStock}
    </p>
  </div>

  {/* TODAY */}

  <div className="bg-gray-900 p-6 rounded-xl">
    <h3 className="text-gray-400">Today's Purchases</h3>
    <p className="text-3xl font-bold text-blue-400 mt-3">
      ₹{formatCurrency(stats.todaysPurchases)}
    </p>
  </div>

  <div className="bg-gray-900 p-6 rounded-xl">
    <h3 className="text-gray-400">Today's Sales</h3>
    <p className="text-3xl font-bold text-green-400 mt-3">
      ₹{formatCurrency(stats.todaysSales)}
    </p>
  </div>

  <div className="bg-gray-900 p-6 rounded-xl">
    <h3 className="text-gray-400">Today's Expenses</h3>
    <p className="text-3xl font-bold text-red-400 mt-3">
      ₹{formatCurrency(stats.todaysExpenses)}
    </p>
  </div>

  {/* PROFIT */}

  <div className="bg-gray-900 p-6 rounded-xl">
    <h3 className="text-gray-400">Gross Profit</h3>
    <p className="text-3xl font-bold text-green-400 mt-3">
      ₹{formatCurrency(stats.grossProfit)}
    </p>
  </div>

  <div className="bg-gray-900 p-6 rounded-xl">
    <h3 className="text-gray-400">Net Profit</h3>
    <p className="text-3xl font-bold text-green-400 mt-3">
      ₹{formatCurrency(stats.netProfit)}
    </p>
  </div>

  <div className="bg-gray-900 p-6 rounded-xl">
    <h3 className="text-gray-400">Total Expenses</h3>
    <p className="text-3xl font-bold text-red-400 mt-3">
      ₹{formatCurrency(stats.totalExpenses)}
    </p>
  </div>

</div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

  {/* Business Records */}

  <div className="bg-gray-900 rounded-xl p-6">

    <h2 className="text-2xl font-bold mb-6">
      📊 Business Records
    </h2>

    <div className="space-y-5">

      <div className="flex justify-between border-b border-gray-700 pb-3">
        <span className="text-gray-400">
          Purchase Records
        </span>

        <span className="text-blue-400 font-bold text-xl">
          {stats.purchaseCount}
        </span>
      </div>

      <div className="flex justify-between border-b border-gray-700 pb-3">
        <span className="text-gray-400">
          Sales Records
        </span>

        <span className="text-green-400 font-bold text-xl">
          {stats.salesCount}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-400">
          Expense Records
        </span>

        <span className="text-red-400 font-bold text-xl">
          {stats.expenseCount}
        </span>
      </div>

    </div>

  </div>

  {/* Financial Overview */}

  <div className="bg-gray-900 rounded-xl p-6">

    <h2 className="text-2xl font-bold mb-6">
      💰 Financial Overview
    </h2>

    <div className="space-y-5">

      <div className="flex justify-between border-b border-gray-700 pb-3">
        <span className="text-gray-400">
          Amount To Pay
        </span>

        <span className="text-red-400 font-bold text-xl">
          ₹{formatCurrency(stats.totalPendingPurchases)}
        </span>
      </div>

      <div className="flex justify-between border-b border-gray-700 pb-3">
        <span className="text-gray-400">
          Amount To Receive
        </span>

        <span className="text-green-400 font-bold text-xl">
          ₹{formatCurrency(stats.totalPendingSales)}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-400">
          Current Warehouse Stock
        </span>

        <span className="text-purple-400 font-bold text-xl">
          {stats.currentStock} KG
        </span>
      </div>

    </div>

  </div>

</div>  
    </div>
  );
}

export default Dashboard;