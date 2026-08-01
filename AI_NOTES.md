# AI_NOTES.md

## AI Tools Used

* ChatGPT (OpenAI)

---

## 1. Which parts were AI-generated vs. written by me?

AI was primarily used as a development assistant to explain concepts, review code, and suggest implementations.

AI-assisted areas included:

* Request validation using `express-validator`
* Global error handling
* API testing with Jest and Supertest
* README structure and documentation
* Debugging runtime and test issues

I wrote, integrated, modified, and tested the application code, connected all components, implemented the API endpoints, and verified the project locally before committing changes.

---

## 2. What did I validate, test, or change?

I reviewed all AI suggestions before using them.

During development I:

* Fixed file path issues (`expense.json` vs `expenses.json`)
* Corrected routing order (`/total` before `/:id`)
* Fixed validation logic and controller issues
* Updated API responses where necessary
* Added and executed integration tests using Jest and Supertest
* Verified every endpoint in Postman
* Ensured all tests passed successfully before submission

---

## 3. AI suggestions I decided not to use

Some AI suggestions were modified or simplified to better match the assignment requirements.

Examples include:

* Reusing validators versus creating separate ones where appropriate.
* Keeping JSON file storage instead of introducing more advanced persistence approaches.
* Choosing simple REST endpoints and minimal project complexity to align with the assignment scope.

All final code decisions were reviewed and tested before being included in the project.
