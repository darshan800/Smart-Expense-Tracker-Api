# Smart Expense Tracker API

A RESTful API built with **Node.js** and **Express.js** to manage personal expenses. The application supports creating, retrieving, updating, deleting, filtering, and calculating expense totals. It follows a clean architecture using Routes → Controllers → Services and includes request validation, global error handling, and automated integration tests.

---

## Features

* Create a new expense
* View all expenses
* View a single expense by ID
* Update an existing expense
* Delete an expense
* Filter expenses by category
* Calculate total expenses
* Calculate total expenses by category
* Request validation using `express-validator`
* Global error handling
* Custom 404 handler
* Integration testing with Jest and Supertest

---

## Tech Stack

* Node.js
* Express.js
* express-validator
* UUID
* Jest
* Supertest

---

## Project Structure

```text
expense-tracker-api/
│
├── src/
│   ├── controllers/
│   ├── data/
│   │   └── expense.json
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── validators/
│   ├── app.js
│   └── server.js
│
├── tests/
│   └── expense.test.js
│
├── README.md
├── AI_NOTES.md
├── .env.example
├── package.json
├── package-lock.json
└── .gitignore
```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/expense-tracker-api.git
```

### 2. Navigate to the project

```bash
cd expense-tracker-api
```

### 3. Install dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the project root.

Example:

```env
PORT=3000
CORS_ORIGIN=http://localhost:3000
```

---

## Running the Server

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The server will start on:

```text
http://localhost:3000
```

(or the port specified in your `.env` file)

---

## Running the Tests

Run the complete integration test suite:

```bash
npm test
```

Current test coverage includes:

* Create Expense
* Get All Expenses
* Get Expense by ID
* Filter Expenses by Category
* Calculate Total Expenses
* Calculate Total Expenses by Category
* Update Expense
* Delete Expense
* Validation Errors
* Invalid ID Handling

---

## API Endpoints

| Method | Endpoint                               | Description                    |
| ------ | -------------------------------------- | ------------------------------ |
| GET    | `/`                                    | Welcome route                  |
| POST   | `/api/v1/expenses`                     | Create a new expense           |
| GET    | `/api/v1/expenses`                     | Get all expenses               |
| GET    | `/api/v1/expenses?category=Food`       | Filter expenses by category    |
| GET    | `/api/v1/expenses/total`               | Get total expenses             |
| GET    | `/api/v1/expenses/total?category=Food` | Get total expenses by category |
| GET    | `/api/v1/expenses/:id`                 | Get an expense by ID           |
| PUT    | `/api/v1/expenses/:id`                 | Update an expense              |
| DELETE | `/api/v1/expenses/:id`                 | Delete an expense              |

---

## Sample Request

### Create Expense

**POST** `/api/v1/expenses`

```json
{
  "title": "Groceries",
  "amount": 1200,
  "category": "Food",
  "date": "2026-08-01"
}
```

---

## Sample Response

```json
{
  "success": true,
  "message": "Expense created successfully",
  "data": {
    "id": "generated-uuid",
    "title": "Groceries",
    "amount": 1200,
    "category": "Food",
    "date": "2026-08-01"
  }
}
```

---

## Error Response Example

```json
{
  "success": false,
  "message": "Expense not found"
}
```

---

## Testing

The project includes automated integration tests using **Jest** and **Supertest**.

The test suite verifies:

* Successful API operations
* Request validation
* Error handling
* Invalid routes
* Invalid resource IDs
* Category filtering
* Expense total calculations

---

## Future Improvements

Possible enhancements include:

* User authentication
* Database integration (MongoDB or PostgreSQL)
* Pagination
* Sorting and searching
* Monthly reports and analytics
* Docker support
* Swagger/OpenAPI documentation

---

## Author

**Darshan Kulkarni**

---

## Assignment

This project was developed as part of the **Diligent Software Engineering Apprenticeship 2026** take-home assignment.

---

## License

This project is intended for educational and evaluation purposes.
