import { useState, useEffect } from "react";
const formatCurrency = (amount) => {
  return Number(amount || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  });
};

function Expenses() {
  const [expenses, setExpenses] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    expenseType: "",
    amount: "",
    description: "",
    date: "",
  });

  useEffect(() => {
  fetchExpenses();
}, []);
const fetchExpenses = async () => {
  try {
    const response = await fetch(
      "https://bikkina-erp-production-740d.up.railway.app"
    );


    const data = await response.json();

    setExpenses(data);
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
      expenseType: "",
      amount: "",
      description: "",
      date: "",
    });

    setEditingIndex(null);
  };

  

    const handleSubmit = async (e) => {
  e.preventDefault();

  const record = {
    expenseName: formData.expenseType,
    amount: Number(formData.amount),
    category: formData.expenseType,
    date: formData.date,
    notes: formData.description,
  };

  try {

    if (editingIndex !== null) {

      await fetch(
        `https://bikkina-erp-production-740d.up.railway.app/api/expenses/${expenses[editingIndex]._id}`,
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
        "https://bikkina-erp-production-740d.up.railway.app/api/expenses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(record),
        }
      );

    }

    await fetchExpenses();

    resetForm();
    setShowModal(false);

  } catch (error) {
    console.error(error);
    alert("Failed to save expense");
  }
};
  const handleEdit = (index) => {
    setFormData(expenses[index]);
    setEditingIndex(index);
    setShowModal(true);
  };

 const handleDelete = async (id) => {
  if (!window.confirm("Delete this expense?"))
    return;

  try {
    await fetch(
      `https://bikkina-erp-production-740d.up.railway.app/api/expenses/${id}`,
      {
        method: "DELETE",
      }
    );

    await fetchExpenses();
  } catch (error) {
    console.error(error);
  }
};

  const filteredExpenses = expenses.filter(
  (expense) =>
    expense.expenseName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    expense.notes
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
);

  const totalExpenseAmount =
    filteredExpenses.reduce(
      (sum, expense) =>
        sum + Number(expense.amount || 0),
      0
    );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">
          Expenses
        </h1>

        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-lg font-bold"
        >
          + Add Expense
        </button>
      </div>

      <div className="bg-gray-900 p-5 rounded-xl mb-6">
        <input
          type="text"
          placeholder="Search Expense Type or Description..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="w-full p-3 rounded bg-gray-800"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

        <div className="bg-gray-900 p-5 rounded-xl">
          <h3>Total Transactions</h3>

          <p className="text-2xl font-bold mt-2">
            {filteredExpenses.length}
          </p>
        </div>

        <div className="bg-gray-900 p-5 rounded-xl">
          <h3>Total Expense Amount</h3>

          <p className="text-2xl font-bold mt-2 text-red-400">
            ₹{formatCurrency(totalExpenseAmount)}
          </p>
        </div>

      </div>

      <div className="bg-gray-900 rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-800">
            <tr>
              <th className="p-4 text-left">
                Expense Type
              </th>

              <th className="p-4 text-left">
                Description
              </th>

              <th className="p-4 text-left">
                Amount
              </th>

              <th className="p-4 text-left">
                Date
              </th>

              <th className="p-4 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>

            {filteredExpenses.map(
              (expense, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-800"
                >
                  <td className="p-4">
                    {expense.expenseName}
                  </td>

                  <td className="p-4">
                    {expense.notes}
                  </td>

                  <td className="p-4 text-red-400">
                    ₹{formatCurrency(expense.amount)}
                  </td>

                  <td className="p-4">
                    {expense.date}
                  </td>

                  <td className="p-4 flex gap-2">
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
                        handleDelete(expense._id)
                      }
                      className="bg-red-600 px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">

          <div className="bg-gray-900 p-6 rounded-xl w-[600px]">

            <h2 className="text-2xl font-bold mb-5">

              {editingIndex !== null
                ? "Edit Expense"
                : "Add Expense"}

            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-2 gap-4"
            >

              <select
                name="expenseType"
                value={formData.expenseType}
                onChange={handleChange}
                className="p-3 rounded bg-gray-800"
                required
              >
                <option value="">
                  Select Expense Type
                </option>

                <option value="Transport">
                  Transport
                </option>

                <option value="Labour">
                  Labour
                </option>

                <option value="Other">
                  Other
                </option>
              </select>

              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={formData.amount}
                onChange={handleChange}
                className="p-3 rounded bg-gray-800"
                required
              />

              <input
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
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

              <div className="col-span-2 flex gap-3">

                <button
                  type="submit"
                  className="bg-red-600 px-5 py-3 rounded"
                >
                  {editingIndex !== null
                    ? "Update Expense"
                    : "Save Expense"}
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

export default Expenses;