import { queues, jobOptions } from ".";

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error("Required arguments: <queue-name> <json-payload>");
    process.exit(1);
  }

  try {
    const [name, payload] = args;
    const queue = queues[name];
    if (!queue) {
      throw new Error(`'${name}' is not an active queue`);
    }

    const json = JSON.parse(payload);
    const job = await queue.add(json, jobOptions);
    console.log(`Job #${job.id} sent to '${queue.name}'`, json);
    process.exit(0);
  } catch (error: any) {
    console.error("Error producing job:", error.message);
    process.exit(1);
  }
}

main();
