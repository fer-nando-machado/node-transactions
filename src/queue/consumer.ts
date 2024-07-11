import { queues, queueOptions } from ".";

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error("Required arguments: <queue-name>");
    process.exit(1);
  }

  const [name] = args;
  const queue = queues[name];
  if (!queue) {
    console.error(`'${name}' is not an active queue`);
    process.exit(1);
  }

  queue.attachProcessor();
  console.log(
    `Redis is running for '${queue.name}' at ${queueOptions.redis.host}:${queueOptions.redis.port}`
  );
}

main();
