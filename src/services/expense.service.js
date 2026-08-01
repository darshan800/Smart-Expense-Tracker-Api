import fs from "fs/promises";
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
