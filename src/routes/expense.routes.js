import { Router } from "express";
import {createExpense} from "../controllers/expense.controller"


const router=Router();

router.post("/",createExpense)

export default router;