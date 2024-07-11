import Queue from "bull";
import { Account, createAccount } from "../core/account";
import QueueProcessor from "./processor";
import { queueOptions } from ".";

const processor = async (job: Queue.Job<Account>): Promise<void> => {
  const account = await createAccount(job.data);
  console.log("Account created", account);
};

export const accountQueue = new QueueProcessor<Account>(
  "account-queue",
  queueOptions,
  processor
);
