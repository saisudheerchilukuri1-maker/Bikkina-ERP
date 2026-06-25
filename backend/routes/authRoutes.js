const express = require("express");

const {
  registerUser,
  loginUser,
  changePassword,
} = require("../controllers/authController");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Auth Route Working",
  });
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.put("/change-password", changePassword);

module.exports = router;