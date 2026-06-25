const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    companyName: {
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
    receivedAmount: {
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

  purchaseInvoice:{
type:String,
required:true
} ,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Sale",
  saleSchema
);