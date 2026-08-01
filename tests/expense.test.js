import request from "supertest";
import app from "../src/app.js";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/data/expense.json");

beforeEach(() => {
  fs.writeFileSync(filePath, JSON.stringify([]));
});
const expenseData = {
  title: "Pizza",
  amount: 250,
  category: "Food",
  date: "2026-08-01",
};
describe("Expense API", () => {
  describe("GET /", () => {
    test("GET / should return welcome message", async () => {
      const response = await request(app).get("/");

      expect(response.statusCode).toBe(200);
      expect(response.text).toBe("Expense Tracker API");
    });
  });

  //Test- Create Expense
  describe("POST /api/v1/expenses", () => {
    test("POST /api/v1/expenses should create a new expense", async () => {
      const response = await request(app)
        .post("/api/v1/expenses")
        .send(expenseData);

      expect(response.statusCode).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe("Pizza");
    });
  });

  //Test - Validaton failed
  describe(" POST should fail when title is missing", () => {
    test("POST should fail when title is missing", async () => {
      const response = await request(app)
        .post("/api/v1/expenses")
        .send({ amount: 250, category: "Food", date: "2026-08-01" });

      expect(response.statusCode).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  //Get all expenses
  describe("GET /api/v1/expenses", () => {
    test("should return all expenses", async () => {
      await request(app).post("/api/v1/expenses").send(expenseData);

      const response = await request(app).get("/api/v1/expenses");

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBe(1);
    });
  });

  //get expense by id
  describe("GET /api/v1/expenses/:id", () => {
    test("should return expense by id", async () => {
      const createResponse = await request(app)
        .post("/api/v1/expenses")
        .send(expenseData);

      const id = createResponse.body.data.id;

      const response = await request(app).get(`/api/v1/expenses/${id}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(id);
    });
  });

  //get expenses by invalid id
  describe("GET /api/v1/expenses/invalid-id", () => {
    test("should return 404 for invalid expense id", async () => {
      const response = await request(app).get("/api/v1/expenses/invalid-id");

      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  //update expenses
  describe(" POST /api/v1/expenses", () => {
    test("should update an expense", async () => {
      const createResponse = await request(app)
        .post("/api/v1/expenses")
        .send(expenseData);

      const id = createResponse.body.data.id;

      const response = await request(app).put(`/api/v1/expenses/${id}`).send({
        title: "Burger",
        amount: 350,
        category: "Food",
        date: "2026-08-01",
      });

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe("Burger");
    });
  });

  //update invalid expense id
  describe("PUT /api/v1/expenses/invalid-id", () => {
    test("should return 404 when updating invalid expense", async () => {
      const response = await request(app)
        .put("/api/v1/expenses/invalid-id")
        .send(expenseData);

      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  //delete expense id
  describe("DELETE  /api/v1/expenses", () => {
    test("should delete an expense", async () => {
      const createResponse = await request(app)
        .post("/api/v1/expenses")
        .send(expenseData);

      const id = createResponse.body.data.id;

      const response = await request(app).delete(`/api/v1/expenses/${id}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
    });
  });

  //delete invalid excpense id
  describe("DELETE /api/v1/expenses/invalid-id", () => {
    test("should return 404 when deleting invalid expense", async () => {
      const response = await request(app).delete("/api/v1/expenses/invalid-id");

      expect(response.statusCode).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  //Test all filter with category
  describe("/api/v1/expenses", () => {
    test("should filter expenses by category", async () => {
      await request(app).post("/api/v1/expenses").send(expenseData);

      await request(app).post("/api/v1/expenses").send({
        title: "Bus",
        amount: 100,
        category: "Travel",
        date: "2026-08-01",
      });

      const response = await request(app).get("/api/v1/expenses?category=Food");

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBe(1);
      expect(response.body.data[0].category).toBe("Food");
    });
  });

  //Total expenses
  describe("GET /api/v1/expenses/total", () => {
    test("should calculate total expenses", async () => {
      await request(app).post("/api/v1/expenses").send(expenseData);

      await request(app).post("/api/v1/expenses").send({
        title: "Bus",
        amount: 100,
        category: "Travel",
        date: "2026-08-01",
      });

      const response = await request(app).get("/api/v1/expenses/total");

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.total).toBe(350);
    });
  });

  //Total by category
  describe(" /api/v1/expenses/total?category", () => {
    test("should calculate total expenses by category", async () => {
      await request(app).post("/api/v1/expenses").send(expenseData);

      await request(app).post("/api/v1/expenses").send({
        title: "Burger",
        amount: 300,
        category: "Food",
        date: "2026-08-01",
      });

      await request(app).post("/api/v1/expenses").send({
        title: "Bus",
        amount: 100,
        category: "Travel",
        date: "2026-08-01",
      });

      const response = await request(app).get(
        "/api/v1/expenses/total?category=Food"
      );

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.category).toBe("Food");
      expect(response.body.total).toBe(550);
    });
  });
});
