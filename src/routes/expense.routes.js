import { Router } from "express";
import {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getTotalExpenses,
} from "../controllers/expense.controller.js";

import {
  createExpenseValidator,
  updateExpenseValidator,
} from "../validators/expense.validator.js";
import { handleValidationErrors } from "../middleware/validation.middleware.js";
const router = Router();

router.post("/", createExpenseValidator, handleValidationErrors, createExpense);
router.get("/", getAllExpenses);
router.get("/total", getTotalExpenses);
router.get("/:id", getExpenseById);
router.put(
  "/:id",
  updateExpenseValidator,
  handleValidationErrors,
  updateExpense
);
router.delete("/:id", deleteExpense);

export default router;
