import { useState, useEffect } from "react";
const formatCurrency = (amount) => {
  return Number(amount || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  });
};

function Purchases() {
  const [purchases, setPurchases] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [formData, setFormData] = useState({
  invoiceNumber: "",
  customerName: "",
  productName: "",
  quantity: "",
  rate: "",
  date: "",
  notes: "",
});

  useEffect(() => {
  fetchPurchases();
}, []);
const fetchPurchases = async () => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/purchases"
    );

    const data = await response.json();

    setPurchases(data);
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
      invoiceNumber: "",
      customerName: "",
      productName: "",
      quantity: "",
      rate: "",
      date: "",
      notes: "",
    });
    setEditingIndex(null);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const purchaseAmount =
    Number(formData.quantity) *
    Number(formData.rate);

  const record = {
  ...formData,
  totalAmount: purchaseAmount,
  paidAmount:
    purchases[editingIndex]?.paidAmount || 0,
  pendingAmount:
    purchaseAmount -
    (purchases[editingIndex]?.paidAmount || 0),
  paymentStatus:
    purchases[editingIndex]?.paymentStatus ||
    "Pending",
};
  try {
    if (editingIndex !== null) {

      await fetch(
        `http://localhost:5000/api/purchases/${purchases[editingIndex]._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(record),
        }
      );

    } else {

      await fetch(
        "http://localhost:5000/api/purchases",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(record),
        }
      );

    }

    await fetchPurchases();

    resetForm();
    setShowModal(false);

  } catch (error) {
    console.error(error);
  }
};

  const handleEdit = (index) => {
    setFormData(purchases[index]);
    setEditingIndex(index);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
  if (!window.confirm("Delete this purchase?"))
    return;

  try {
    await fetch(
      `http://localhost:5000/api/purchases/${id}`,
      {
        method: "DELETE",
      }
    );

    await fetchPurchases();
  } catch (error) {
    console.error(error);
  }
};
const addPayment = async (index) => {
  const amount = Number(
    prompt("Enter Payment Amount")
  );

  if (!amount || amount <= 0) return;

  const purchase = purchases[index];

  if (amount > purchase.pendingAmount) {
    alert(
      `You can only pay up to ₹${purchase.pendingAmount}`
    );
    return;
  }

  const newPaid =
    Number(purchase.paidAmount || 0) + amount;

  const newPending =
    Number(purchase.totalAmount) - newPaid;

  let status = "Pending";

  if (newPaid > 0) {
    status = "Partially Paid";
  }

  if (newPending <= 0) {
    status = "Paid";
  }

  try {
    await fetch(
      `http://localhost:5000/api/purchases/${purchase._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...purchase,
          paidAmount: newPaid,
          pendingAmount:
            newPending < 0 ? 0 : newPending,
          paymentStatus: status,
        }),
      }
    );

    await fetchPurchases();
  } catch (error) {
    console.error(error);
  }
};
const removePayment = async (index) => {
  const amount = Number(
    prompt("Enter Amount To Remove")
  );

  if (!amount || amount <= 0) return;

  const purchase = purchases[index];

  if (amount > purchase.paidAmount) {
    alert(
      `You can only remove up to ₹${purchase.paidAmount}`
    );
    return;
  }

  const newPaid =
    Number(purchase.paidAmount || 0) - amount;

  const newPending =
    Number(purchase.totalAmount) - newPaid;

  let status = "Pending";

  if (newPaid > 0) {
    status = "Partially Paid";
  }

  if (newPending === 0) {
    status = "Paid";
  }

  try {
    await fetch(
      `http://localhost:5000/api/purchases/${purchase._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...purchase,
          paidAmount: newPaid,
          pendingAmount: newPending,
          paymentStatus: status,
        }),
      }
    );

    await fetchPurchases();
  } catch (error) {
    console.error(error);
  }
};

  const filteredPurchases = purchases.filter((item) => {
    

 const matchesSearch =
  item.invoiceNumber
    ?.toLowerCase()
    .includes(searchTerm.toLowerCase()) ||
  item.customerName
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
const totalQty = filteredPurchases.reduce(
  (sum, item) => sum + Number(item.quantity || 0),
  0
);

const totalAmount = filteredPurchases.reduce(
  (sum, item) => sum + Number(item.totalAmount || 0),
  0
);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Purchases</h1>

        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg font-bold"
        >
          + Add Purchase
        </button>
      </div>

     <div className="bg-gray-900 p-5 rounded-xl mb-6">
  <input
    type="text"
    placeholder="Search Customer or Product..."
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
            {filteredPurchases.length}
          </p>
        </div>

        <div className="bg-gray-900 p-5 rounded-xl">
          <h3>Total Quantity</h3>
          <p className="text-2xl font-bold mt-2 text-yellow-400">
            {totalQty}
          </p>
        </div>

        <div className="bg-gray-900 p-5 rounded-xl">
          <h3>Total Purchase Amount</h3>
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
  Invoice No
</th>

<th className="p-4 text-left">
  Customer
</th> 
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Qty</th>
              <th className="p-4 text-left">Rate</th>
              <th className="p-4 text-left">Amount</th>
<th className="p-4 text-left">Paid</th>
<th className="p-4 text-left">Pending</th>
<th className="p-4 text-left">Status</th>
<th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredPurchases.map((purchase, index) => (
              <tr key={index} className="border-b border-gray-800">
                <td className="p-4 font-bold text-yellow-400">
  {purchase.invoiceNumber}
</td>

<td className="p-4">
  {purchase.customerName}
</td>
                <td className="p-4">{purchase.productName}</td>
                <td className="p-4">{purchase.quantity}</td>
                <td className="p-4">₹{formatCurrency(purchase.rate)}</td>
                <td className="p-4 text-green-400">
  ₹{formatCurrency(purchase.totalAmount)}
</td>

<td className="p-4 text-blue-400">
  ₹{formatCurrency(purchase.paidAmount)}
</td>

<td className="p-4 text-red-400">
  ₹{formatCurrency(purchase.pendingAmount)}
</td>

<td className="p-4">
  {purchase.paymentStatus}
</td>

<td className="p-4">
  {purchase.date}
</td>
             <td className="p-4 flex gap-2">

  <button
    onClick={() => addPayment(index)}
    className="bg-green-600 px-3 py-1 rounded"
  >
    Add Payment
  </button>
  <button
  onClick={() => removePayment(index)}
  className="bg-orange-600 px-3 py-1 rounded"
>
  Remove Payment
</button>

  <button
    onClick={() => handleEdit(index)}
    className="bg-yellow-600 px-3 py-1 rounded"
  >
    Edit
  </button>

  <button
    onClick={() => handleDelete(purchase._id)}
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
              {editingIndex !== null
                ? "Edit Purchase"
                : "Add Purchase"}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-2 gap-4"
            >
             <input
  type="text"
  name="invoiceNumber"
  placeholder="Invoice Number"
  value={formData.invoiceNumber}
  onChange={handleChange}
  className="p-3 rounded bg-gray-800"
  required
/> 
              <input
                type="text"
                name="customerName"
                placeholder="Customer Name"
                value={formData.customerName}
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
                  className="bg-blue-600 px-5 py-3 rounded"
                >
                  {editingIndex !== null
                    ? "Update Purchase"
                    : "Save Purchase"}
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

export default Purchases;
