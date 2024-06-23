// src/api/account.ts
import { Router, Request, Response } from "express";
import { createTransaction } from "../core/transaction";

const transactionRouter = Router();

transactionRouter.post("/transaction", (req: Request, res: Response) => {
  try {
    const transaction = createTransaction({ ...req.body });
    res.status(201).json(transaction);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default transactionRouter;
