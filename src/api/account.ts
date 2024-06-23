// src/api/account.ts
import { Router, Request, Response } from "express";
import { getAccountById, createAccount, Account } from "../core/account";

const accountRouter = Router();

accountRouter.get("/account/:accountId", (req: Request, res: Response) => {
  const accountId = parseInt(req.params.accountId, 10);
  try {
    const account = getAccountById(accountId);
    res.json(account);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
});

accountRouter.post("/account", (req: Request, res: Response) => {
  try {
    const account = createAccount({ ...req.body });
    res.status(201).json(account);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default accountRouter;
