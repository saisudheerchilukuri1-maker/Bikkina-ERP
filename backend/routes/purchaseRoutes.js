const express = require("express");

const {
  getPurchases,
  addPurchase,
  deletePurchase,
    updatePurchase,
} = require("../controllers/purchaseController");

const router = express.Router();

router.get("/", getPurchases);

router.post("/", addPurchase);

router.delete("/:id", deletePurchase);
router.put("/:id", updatePurchase);


module.exports = router;