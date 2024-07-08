import { Queue } from "bull";
import accountQueue from "./account";

const QUEUE_HOST = process.env.QUEUE_HOST || "127.0.0.1";
const QUEUE_PORT = Number(process.env.QUEUE_PORT) || 6379;

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

export const queues: { [key: string]: Queue<any> } = {
  [accountQueue.name]: accountQueue,
};

const keys = Object.keys(queues)
  .map((k) => `'${k}'`)
  .join(", ");

console.log(
  `Redis running at ${QUEUE_HOST}:${QUEUE_PORT} with queues: [${keys}]`
);
