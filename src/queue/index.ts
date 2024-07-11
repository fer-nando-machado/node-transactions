import { Account } from "../core/account";
import { accountQueue } from "./account";
import QueueProcessor from "./processor";

const QUEUE_HOST = process.env.QUEUE_HOST || "localhost";
const QUEUE_PORT = Number(process.env.QUEUE_PORT) || 6379;

export const queues: { [key: string]: QueueProcessor<Account> } = {
  [accountQueue.name]: accountQueue,
};

export const queueOptions = {
  redis: {
    host: QUEUE_HOST,
    port: QUEUE_PORT,
  },
};

export const jobOptions = {
  attempts: 3,
  backoff: 3000,
};

console.log(`📨 Redis is running at ${QUEUE_HOST}:${QUEUE_PORT}`);
