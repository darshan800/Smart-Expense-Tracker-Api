import { createExpenseService } from "../services/expense.service.js";

export const createExpense = (req, res) => {
  const expenseData = req.body;

  const expense = createExpenseService(expenseData);

  res.status(201).json({
    success: true,
    message: "Expense created successfully",
    data: expense,
  });
};