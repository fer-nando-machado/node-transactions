import Queue from "bull";
import { Account, createAccount } from "../core/account";
import { queueOptions } from "./worker";

const accountQueue = new Queue<Account>("account-queue", queueOptions);

accountQueue.process(async (job) => {
  try {
    console.log(`Processing job #${job.id}`, job.data);
    const account = createAccount(job.data);
    console.log("Account created", account);
  } catch (error: any) {
    console.error(`Error processing job #${job.id}`, error.message);
    throw error;
  }
});

export default accountQueue;
