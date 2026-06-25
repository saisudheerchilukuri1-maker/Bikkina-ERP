const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema(
  {
    invoiceNumber: {
  type: String,
  required: true,
  unique: true,
},
    customerName: {
      type: String,
      required: true,
    },

    productName: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    rate: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },
    paidAmount: {
  type: Number,
  default: 0,
},

pendingAmount: {
  type: Number,
  default: 0,
},

paymentStatus: {
  type: String,
  default: "Pending",
},

    date: {
      type: String,
      required: true,
    },

    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Purchase",
  purchaseSchema
);