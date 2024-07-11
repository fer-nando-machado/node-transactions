import Queue, { Job, QueueOptions } from "bull";

type JobProcessor<T> = (job: Job<T>) => Promise<void>;

export default class QueueProcessor<T> extends Queue<T> {
  private processor: JobProcessor<T>;
  private wrapper(processor: JobProcessor<T>): JobProcessor<T> {
    return async (job: Job<T>): Promise<void> => {
      try {
        console.log(`Processing job #${job.id}`, job.data);
        await processor(job);
        console.log(`Successfully processed job #${job.id}`);
      } catch (error: any) {
        console.error(`Error processing job #${job.id}:`, error.message);
        throw error;
      }
    };
  }

  constructor(name: string, options: QueueOptions, processor: JobProcessor<T>) {
    super(name, options);
    this.processor = this.wrapper(processor);
  }

  attachProcessor(): void {
    this.process(this.processor);
  }
}
