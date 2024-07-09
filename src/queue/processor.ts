import Queue, { Job, QueueOptions } from "bull";

export default class QueueProcessor<T> extends Queue<T> {
  processor: (job: Job<T>) => Promise<void>;

  constructor(
    name: string,
    options: QueueOptions,
    processor: (job: Job<T>) => Promise<void>
  ) {
    super(name, options);
    this.processor = processor;
  }

  attachProcessor(): void {
    this.process(this.processor);
  }
}
