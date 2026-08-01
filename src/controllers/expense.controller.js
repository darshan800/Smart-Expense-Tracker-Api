import {
  createExpenseService,
  getAllExpensesService,
  getExpenseByIdService,
  updateExpenseService,
  deleteExpenseService,
} from "../services/expense.service.js";

import ApiError from "../utils/apiError.js";

export const createExpense = async (req, res, next) => {
  const expenseData = req.body;

  try {
    const expense = await createExpenseService(expenseData);

    res.status(201).json({
      success: true,
      message: "Expense created successfully",
      data: expense,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllExpenses = async (req, res, next) => {
  try {
    const expenses = await getAllExpensesService();

    res.status(200).json({
      success: true,
      data: expenses,
    });
  } catch (error) {
    next(error);
  }
};

export const getExpenseById = async (req, res, next) => {
  try {
    const expense = await getExpenseByIdService(req.params.id);
    if (!expense) {
      throw new ApiError(404, "Expense not found");
    }

    return res.status(200).json({
      success: true,
      data: expense,
    });
  } catch (error) {
    next(error);
  }
};

export const updateExpense = async (req, res, next) => {
  try {
    const expense = await updateExpenseService(req.params.id, req.body);

    if (!expense) {
      throw new ApiError(404, "Expense not found");
    }

    res.status(200).json({
      success: true,
      message: "Expense updated successfully",
      data: expense,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteExpense = async (req, res, next) => {
  try {
    const deleted = await deleteExpenseService(req.params.id);

    if (!deleted) {
      throw new ApiError(404, "Expense not found");
    }

    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
