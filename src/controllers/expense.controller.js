import { createExpenseService } from "../services/expense.service.js";

export const createExpense = async (req, res) => {
  const expenseData = req.body;

  try {
    const expense = await createExpenseService(expenseData);

    res.status(201).json({
      success: true,
      message: "Expense created successfully",
      data: expense,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
