import Queue from "bull";
import QueueProcessor from "./processor";
import { queueOptions } from ".";
import { Transaction, createTransaction } from "../core/transaction";

const processor = async (job: Queue.Job<Transaction>): Promise<void> => {
  const transaction = await createTransaction(job.data);
  console.log("Transaction created", transaction);
};

export const transactionQueue = new QueueProcessor<Transaction>(
  "transaction-queue",
  queueOptions,
  processor
);
