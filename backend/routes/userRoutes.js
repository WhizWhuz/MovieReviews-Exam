const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");
const authMiddleware = require("../middlewares/authMiddleware");

router.route("/register").post(userControllers.createUser);
router.route("/login").post(userControllers.loginUser);
router.route("/me").get(authMiddleware, userControllers.getCurrentUser);
router.get("/test", (req, res) => {
  res.json({ message: "It works" });
});

module.exports = router;
