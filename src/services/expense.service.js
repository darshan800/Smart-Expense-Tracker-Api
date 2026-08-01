import fs from "fs/promises";
import { json } from "stream/consumers";
import { v4 as uuidv4 } from "uuid";

const FILE_PATH = "./src/data/expense.json";

export const createExpenseService = async (expenseData) => {
  // Read existing expenses
  const data = await fs.readFile(FILE_PATH, "utf-8");
  const expenses = JSON.parse(data);

  // Create new expense
  const newExpense = {
    id: uuidv4(),
    ...expenseData,
  };

  // Add to array
  expenses.push(newExpense);

  // Save back to file
  await fs.writeFile(FILE_PATH, JSON.stringify(expenses, null, 2));

  return newExpense;
};

export const getAllExpensesService = async () => {
  // Read expenses.json
  const data = await fs.readFile(FILE_PATH, "utf-8");

  // Parse JSON
  const expenses = JSON.parse(data);

  // Return array
  return expenses;
};

export const getExpenseByIdService = async (id) => {
  const data = await fs.readFile(FILE_PATH, "utf-8");

  const expenses = JSON.parse(data);

  const expense = expenses.find((expense) => expense.id === id);

  return expense;
};

export const updateExpenseService = async (id, updatedExpense) => {
  const data = await fs.readFile(FILE_PATH, "utf-8");
  const expenses = JSON.parse(data);

  const index = expenses.findIndex((expense) => expense.id === id);

  if (index === -1) {
    return null;
  }

  expenses[index] = {
    ...expenses[index],
    ...updatedExpense,
  };

  await fs.writeFile(FILE_PATH, JSON.stringify(expenses, null, 2));

  return expenses[index];
};

export const deleteExpenseService = async (id) => {
  const data = await fs.readFile(FILE_PATH, "utf-8");
  const expenses = JSON.parse(data);

  const filteredExpenses = expenses.filter(
    (expense) => expense.id !== id
  );

  if (filteredExpenses.length === expenses.length) {
    return false;
  }

  await fs.writeFile(
    FILE_PATH,
    JSON.stringify(filteredExpenses, null, 2)
  );

  return true;
};