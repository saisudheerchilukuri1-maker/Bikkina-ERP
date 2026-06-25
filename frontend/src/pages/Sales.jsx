
import { useState, useEffect } from "react";
const formatCurrency = (amount) => {
  return Number(amount || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  });
};
function Sales() {
  const [sales, setSales] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [purchaseInvoices, setPurchaseInvoices] = useState([]);

  const [formData, setFormData] = useState({
    purchaseInvoice: "",
    companyName: "",
    productName: "",
    quantity: "",
    rate: "",
    date: "",
    notes: "",
  });

  useEffect(() => {
  fetchSales();
  fetchPurchaseInvoices();
}, []);
const fetchSales = async () => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/sales"
    );

    const data = await response.json();

    setSales(data);
  } catch (error) {
    console.error(error);
  }
};
const fetchPurchaseInvoices = async () => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/purchases"
    );

    const data = await response.json();

    setPurchaseInvoices(data);

  } catch (error) {
    console.error(error);
  }
};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
       purchaseInvoice: "",
      companyName: "",
      productName: "",
      quantity: "",
      rate: "",
      date: "",
       
    });
    setEditingIndex(null);
  };

  

   const handleSubmit = async (e) => {
  e.preventDefault();

  const totalAmount =
    Number(formData.quantity) *
    Number(formData.rate);
   const record = {
  ...formData,
  totalAmount,
  receivedAmount:
    sales[editingIndex]?.receivedAmount || 0,
  pendingAmount:
    totalAmount -
    (sales[editingIndex]?.receivedAmount || 0),
  paymentStatus:
    sales[editingIndex]?.paymentStatus ||
    "Pending",
};
   try {

    if (editingIndex !== null) {

      await fetch(
        `http://localhost:5000/api/sales/${sales[editingIndex]._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(record),
        }
      );

    } else {

      await fetch(
        "http://localhost:5000/api/sales",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(record),
        }
      );

    }

    await fetchSales();

    resetForm();
    setShowModal(false);

  } catch (error) {
    console.error(error);
    alert("Failed to save sale");
  }
};

  const handleEdit = (index) => {
    setFormData(sales[index]);
    setEditingIndex(index);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
  if (!window.confirm("Delete this sale?"))
    return;


  try {
    await fetch(
      `http://localhost:5000/api/sales/${id}`,
      {
        method: "DELETE",
      }
    );

    await fetchSales();
  } catch (error) {
    console.error(error);
  }
};
const receivePayment = async (index) => {
  const amount = Number(
    prompt("Enter Received Amount")
  );

  if (!amount || amount <= 0) return;

  const sale = sales[index];

  if (amount > sale.pendingAmount) {
    alert(
      `You can only receive up to ₹${sale.pendingAmount}`
    );
    return;
  }

  const newReceived =
    Number(sale.receivedAmount || 0) + amount;

  const newPending =
    Number(sale.totalAmount) - newReceived;

  let status = "Pending";

  if (newReceived > 0) {
    status = "Partially Received";
  }

  if (newPending === 0) {
    status = "Received";
  }

  try {
    await fetch(
      `http://localhost:5000/api/sales/${sale._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          ...sale,
          receivedAmount: newReceived,
          pendingAmount: newPending,
          paymentStatus: status,
        }),
      }
    );

    await fetchSales();
  } catch (error) {
    console.error(error);
  }
};
const removeReceivedPayment = async (
  index
) => {
  const amount = Number(
    prompt("Enter Amount To Remove")
  );

  if (!amount || amount <= 0) return;

  const sale = sales[index];

  if (amount > sale.receivedAmount) {
    alert(
      `You can only remove up to ₹${sale.receivedAmount}`
    );
    return;
  }

  const newReceived =
    sale.receivedAmount - amount;

  const newPending =
    sale.totalAmount - newReceived;

  let status = "Pending";

  if (newReceived > 0) {
    status = "Partially Received";
  }

  if (newPending === 0) {
    status = "Received";
  }

  try {
    await fetch(
      `http://localhost:5000/api/sales/${sale._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          ...sale,
          receivedAmount: newReceived,
          pendingAmount: newPending,
          paymentStatus: status,
        }),
      }
    );

    await fetchSales();
  } catch (error) {
    console.error(error);
  }
};

  const filteredSales = sales.filter((item) => {

  const matchesSearch =
    item.companyName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    item.productName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

  const itemDate = new Date(item.date);

  const matchesDate =
    (!fromDate ||
      itemDate >= new Date(fromDate)) &&
    (!toDate ||
      itemDate <= new Date(toDate));

  return matchesSearch && matchesDate;
});

const totalQty = filteredSales.reduce(
  (sum, item) => sum + Number(item.quantity || 0),
  0
);

const totalAmount = filteredSales.reduce(
  (sum, item) => sum + Number(item.totalAmount || 0),
  0
);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Sales</h1>

        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-lg font-bold"
        >
          + Add Sale
        </button>
      </div>

      <div className="bg-gray-900 p-5 rounded-xl mb-6">

  <input
    type="text"
    placeholder="Search Company or Product..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full p-3 rounded bg-gray-800 mb-4"
  />

  <div className="flex gap-4">

    <input
      type="date"
      value={fromDate}
      onChange={(e) => setFromDate(e.target.value)}
      className="bg-gray-800 p-3 rounded"
    />

    <input
      type="date"
      value={toDate}
      onChange={(e) => setToDate(e.target.value)}
      className="bg-gray-800 p-3 rounded"
    />

  </div>

</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-900 p-5 rounded-xl">
          <h3>Total Transactions</h3>
          <p className="text-2xl font-bold mt-2">
            {filteredSales.length}
          </p>
        </div>

        <div className="bg-gray-900 p-5 rounded-xl">
          <h3>Total Quantity Sold</h3>
          <p className="text-2xl font-bold mt-2 text-yellow-400">
            {totalQty}
          </p>
        </div>

        <div className="bg-gray-900 p-5 rounded-xl">
          <h3>Total Sales Amount</h3>
          <p className="text-2xl font-bold mt-2 text-green-400">
            ₹{formatCurrency(totalAmount)}
          </p>
        </div>
      </div>

      <div className="bg-gray-900 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-4 text-left">
Purchase Invoice
</th>

<th className="p-4 text-left">
Company
</th>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Qty</th>
              <th className="p-4 text-left">Rate</th>
              <th className="p-4 text-left">Amount</th>
<th className="p-4 text-left">Received</th>
<th className="p-4 text-left">Pending</th>
<th className="p-4 text-left">Status</th>
<th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredSales.map((sale, index) => (
              <tr key={index} className="border-b border-gray-800">
                <td className="p-4 font-bold text-yellow-400">
  {sale.purchaseInvoice}
</td>

<td className="p-4">
  {sale.companyName}
</td>

<td className="p-4">
  {sale.productName}
</td>
                <td className="p-4">{sale.quantity}</td>
                <td className="p-4">₹{formatCurrency(sale.rate)}</td>
                <td className="p-4 text-green-400">
  ₹{formatCurrency(sale.totalAmount)}
</td>

<td className="p-4 text-blue-400">
  ₹{formatCurrency(sale.receivedAmount)}
</td>

<td className="p-4 text-red-400">
  ₹{formatCurrency(sale.pendingAmount)}
</td>

<td className="p-4">
  {sale.paymentStatus}
</td>

<td className="p-4">
  {sale.date}
</td>
              

<td className="p-4 flex gap-2">

  <button
    onClick={() =>
      receivePayment(index)
    }
    className="bg-green-600 px-3 py-1 rounded"
  >
    Receive Payment
  </button>

  <button
    onClick={() =>
      removeReceivedPayment(index)
    }
    className="bg-orange-600 px-3 py-1 rounded"
  >
    Remove Payment
  </button>

  <button
    onClick={() =>
      handleEdit(index)
    }
    className="bg-yellow-600 px-3 py-1 rounded"
  >
    Edit
  </button>

  <button
    onClick={() =>
      handleDelete(sale._id)
    }
    className="bg-red-600 px-3 py-1 rounded"
  >
    Delete
  </button>

</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded-xl w-[600px]">
            <h2 className="text-2xl font-bold mb-5">
              {editingIndex !== null ? "Edit Sale" : "Add Sale"}
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <select
  name="purchaseInvoice"
  value={formData.purchaseInvoice}
  onChange={handleChange}
  className="p-3 rounded bg-gray-800"
  required
>
  <option value="">
    Select Purchase Invoice
  </option>

  {purchaseInvoices.map((purchase) => (
    <option
      key={purchase._id}
      value={purchase.invoiceNumber}
    >
      {purchase.invoiceNumber}
    </option>
  ))}
</select>
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleChange}
                className="p-3 rounded bg-gray-800"
                required
              />

              <input
                type="text"
                name="productName"
                placeholder="Product Name"
                value={formData.productName}
                onChange={handleChange}
                className="p-3 rounded bg-gray-800"
                required
              />

              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="p-3 rounded bg-gray-800"
                required
              />

              <input
                type="number"
                name="rate"
                placeholder="Rate"
                value={formData.rate}
                onChange={handleChange}
                className="p-3 rounded bg-gray-800"
                required
              />

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="p-3 rounded bg-gray-800"
                required
              />

              <input
                type="text"
                name="notes"
                placeholder="Notes"
                value={formData.notes}
                onChange={handleChange}
                className="p-3 rounded bg-gray-800"
              />

              <div className="col-span-2 flex gap-3">
                <button
                  type="submit"
                  className="bg-green-600 px-5 py-3 rounded"
                >
                  {editingIndex !== null ? "Update Sale" : "Save Sale"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="bg-gray-700 px-5 py-3 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sales;
