import { Router, Request, Response } from "express";
import { createTransaction } from "../core/transaction";

const transactionRouter = Router();

transactionRouter.post("/transaction", async (req: Request, res: Response) => {
  try {
    const transaction = await createTransaction({ ...req.body });
    res.status(201).json(transaction);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default transactionRouter;
