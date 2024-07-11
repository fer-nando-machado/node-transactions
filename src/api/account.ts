import { Router, Request, Response } from "express";
import { getAccountById, createAccount } from "../core/account";

const accountRouter = Router();

accountRouter.get("/account/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const account = await getAccountById(id);
    res.json(account);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
});

accountRouter.post("/account", async (req: Request, res: Response) => {
  try {
    const account = await createAccount({ ...req.body });
    res.status(201).json(account);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default accountRouter;
