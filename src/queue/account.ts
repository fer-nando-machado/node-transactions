import Queue from "bull";
import { Account, createAccount } from "../core/account";
import QueueProcessor from "./processor";
import { queueOptions } from ".";

const processor = async (job: Queue.Job<Account>): Promise<void> => {
  try {
    console.log(`Processing job #${job.id}`, job.data);
    const account = createAccount(job.data);
    console.log("Account created", account);
  } catch (error: any) {
    console.error(`Error processing job #${job.id}`, error.message);
    throw error;
  }
};

export const accountQueue = new QueueProcessor<Account>(
  "account-queue",
  queueOptions,
  processor
);
