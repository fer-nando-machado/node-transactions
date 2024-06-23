// src/api/account.ts
import { Router, Request, Response } from "express";
import { getAccountById } from "../core/account";

const router = Router();

router.get("/accounts/:accountId", (req: Request, res: Response) => {
  const accountId = parseInt(req.params.accountId, 10);
  try {
    const account = getAccountById(accountId);
    res.json(account);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
});

export default router;
