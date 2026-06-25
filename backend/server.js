const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const purchaseRoutes =
  require("./routes/purchaseRoutes");
  const saleRoutes =
  require("./routes/saleRoutes");
  const expenseRoutes =
  require("./routes/expenseRoutes");
  const dashboardRoutes =
  require("./routes/dashboardRoutes");


dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use(
  "/api/purchases",
  purchaseRoutes
);
app.use(
  "/api/sales",
  saleRoutes
);
app.use(
  "/api/expenses",
  expenseRoutes
);
app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.get("/", (req, res) => {
  res.send("Business ERP Backend Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});