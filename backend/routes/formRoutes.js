const express = require("express");

const {
  createForm,
  getForms,
  getFormById,
  updateForm,
} = require("../controllers/formController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createForm);

router.get("/", protect, getForms);

router.get("/:id", protect, getFormById);

router.put("/:id", protect, updateForm);

module.exports = router;