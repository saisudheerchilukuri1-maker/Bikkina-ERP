const express = require("express");

const {
  getSales,
  addSale,
  deleteSale,
  updateSale,
} = require("../controllers/saleController");

const router = express.Router();

router.get("/", getSales);

router.post("/", addSale);

router.delete("/:id", deleteSale);
router.put("/:id", updateSale);
module.exports = router;