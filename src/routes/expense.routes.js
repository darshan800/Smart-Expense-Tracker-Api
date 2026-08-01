import { Router } from "express";
import { createExpense } from "../controllers/expense.controller.js";
import { getAllExpenses ,getExpenseById } from "../controllers/expense.controller.js";
const router = Router();

router.post("/", createExpense);
router.get("/", getAllExpenses);
router.get("/:id", getExpenseById);

export default router;
