import express from "express";
import cors from "cors";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));

//
import expenseRouter from "./routes/expense.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import ApiError from "./utils/apiError.js";
app.use("/api/v1/expenses", expenseRouter);

//404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

//global error handler
app.use(errorHandler);

export default app;
