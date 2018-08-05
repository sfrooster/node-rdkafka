import { Readable, Writable } from "stream";

export class Client extends NodeJS.EventEmitter {
  constructor(globalConf: any, SubClientType: any, topicConf: any);

  connect(metadataOptions?: any, cb?: (err: any, data: any) => any): this;

  getClient(): Client;

  connectedTime(): number;

  getLastError(): Error | null;

  disconnect(cb?: (err: any, data: any) => any): this;


  offsetsForTimes(topicPartitions: any[], timeout: number, cb?: (err: any, offsets: any) => any): void;
  offsetsForTimes(topicPartitions: any[], cb?: (err: any, offsets: any) => any): void;

  // currently need to overload signature for different callback arities because of https://github.com/Microsoft/TypeScript/issues/15972
  on<T extends keyof EventCallbackRepositoryArityOne, K extends EventCallbackRepositoryArityOne[T]>(val: T, listener: (arg: K) => void): this;
  on<T extends keyof EventCallbackRepositoryArityTwo, K extends EventCallbackRepositoryArityTwo[T]>(val: T, listener: (arg0: K[0], arg1: K[1]) => void): this;
  once<T extends keyof EventCallbackRepositoryArityOne, K extends EventCallbackRepositoryArityOne[T]>(val: T, listener: (arg: K) => void): this;
  once<T extends keyof EventCallbackRepositoryArityTwo, K extends EventCallbackRepositoryArityTwo[T]>(val: T, listener: (arg0: K[0], arg1: K[1]) => void): this;
}

export type ErrorWrap<T> = boolean | T;

export class KafkaConsumer extends Client {
  constructor(conf: any, topicConf: any);

  assign(assignments: any): this;

  assignments(): ErrorWrap<any>;

  commit(topicPartition: any): this;
  commit(): this;

  commitMessage(msg: any): this;

  commitMessageSync(msg: any): this;

  commitSync(topicPartition: any): this;

  committed(toppars: any, timeout: any, cb: (err: any, topicPartitions: any) => void, ...args: any[]): ErrorWrap<any>;

  consume(number: number, cb?: any): void;
  consume(): void;

  getWatermarkOffsets(topic: any, partition: any): ErrorWrap<any>;

  offsetsStore(topicPartitions: any): ErrorWrap<any>;

  pause(topicPartitions: any): ErrorWrap<any>;

  position(toppars: any): ErrorWrap<any>;

  resume(topicPartitions: any): ErrorWrap<any>;

  seek(toppar: any, timeout: any, cb: any): this;

  seek(toppar: any, timeout: any, cb: any): any;

  subscribe(topics: string[]): this;

  subscription(): ErrorWrap<any>;

  unassign(): this;

  unsubscribe(): this;

  unsubscribe(): any;
}

export interface StreamConfig {
  waitInterval: number;
  topics: string | string[] | RegExp | ((topicMetadata: Metadata) => string);
}

export namespace Kafka {
  export interface Connection { }
  export interface KafkaConsumer extends Connection { }
  export interface Producer extends Connection { }
}

export interface LibRdKafkaError extends Error {
  message: string;
  code: KafkaErrorCode;
  origin: "local" | "kafka";
}

// export interface DeliveryReport {
//   topic: string;
//   partition: number;
//   offset: number;
//   opaque?: any;
// }

export namespace Events {
  export interface DeliveryReportEvent {
    topic: string;
    partition: number;
    offset: number;
    opaque?: any;
  }
  interface DisconnectedEvent {
    connectionOpened: Date;
  }

  interface ErrorEvent extends LibRdKafkaError { }

  interface EventEvent {
    message: string;
  }
  interface LogEvent {
    message: string;
    severity: LogEvent.Severity;
    fac: string;
  }

  namespace LogEvent {
    enum Severity {
      EMERG = 0,
      ALERT = 1,
      CRITICAL = 2,
      ERROR = 3,
      WARNING = 4,
      NOTICE = 5,
      INFO = 6,
      DEBUG = 7
    }
  }

  interface ReadyEvent {
    name: string;
  }

  interface StatisticsEvent {
    message: string;
  }

  interface ThrottleEvent {
    brokerId: number;
    brokerName: string;
    message: string;
    throttleTime: number;
  }
}

export type KafkaMessage = ConsumerStreamMessage;

export interface MetadataOptionsOneTopic {
  topic: string;
  timeout?: number;
}

export interface MetadataOptionsAllTopics {
  allTopics: true;
  timeout?: number;
}

export type MetadataOptions = MetadataOptionsOneTopic | MetadataOptionsAllTopics;

export interface Metadata {
  orig_broker_id: number;
  orig_broker_name: string;
  brokers: MetadataBroker[];
  topics: MetadataTopic[];
}

export interface MetadataBroker {
  id: number;
  host: string;
  port: number;
}

export interface MetadataTopic {
  name: string;
  partitions: MetadataPartition[];
}

export interface MetadataPartition {
  id: number;
  leader: number;
  replaicas: number[];
  isrs: number[];
}

export interface ClientMetrics {
  connectionOpened: Date;
}

export interface TopicPartitionOffset extends TopicPartition {
  offset: number;
}

export interface TopicPartition {
  topic: string;
  partition: number;
}

export type OffsetType = "earliest" | "beginning" | "latest" | "end" | "stored" | number | Date;

export interface SpecifiesTopicPartitionOffset {
  topic: string;
  partition: number;
  offset?: OffsetType | null;
}

export class TopicPartitionOffsetSpecification implements SpecifiesTopicPartitionOffset {
  constructor(topic: string, partition: number, offset?: OffsetType | null);
  static create(specification: SpecifiesTopicPartitionOffset): TopicPartitionOffsetSpecification;
  static map(specifications: SpecifiesTopicPartitionOffset[]): TopicPartitionOffsetSpecification[];

  topic: string;
  partition: number;
  offset: OffsetType;
}


export interface watermarkOffsets {
  high: number;
  low: number;
}

// mhaan added above

export class Client extends NodeJS.EventEmitter {

  constructor(globalConf: GlobalConfig, SubClientType: Kafka.Connection, topicConf: TopicConfig | undefined);

  // connect(metadataOptions: MetadataOptions, cb?: (err: Error | null, metadata: Metadata) => void): Client;
  connect(metadataOptions: MetadataOptions, cb?: callback<Metadata>): Client;

  connectedTime(): number;

  // disconnect(cb?: (err: null, data: ClientMetrics) => void): Client;
  // disconnect(cb: callbackNoError<ClientMetrics>): void;

  // getClient(): Client;
  getClient(): Kafka.Connection;

  getLastError(): Error | null;

  // getMetadata(metadataOptions: MetadataOptions, cb: (err: Error | null, data: Metadata) => void): void;
  getMetadata(metadataOptions: MetadataOptions, cb: callback<Metadata>): void;

  isConnected(): boolean;

  offsetsForTimes(topicPartitionOffsets: SpecifiesTopicPartitionOffset[], timeout: number, cb: callback<SpecifiesTopicPartitionOffset[]>): void;

  queryWatermarkOffsets(topic: string, partition: number, timeout: number, cb?: callback<watermarkOffsets>): void;

  // queryWatermarkOffsets(
  //   topic: string,
  //   partition: number,
  //   timeout: any,
  //   // cb?: (err: any, offsets: any) => any
  //   cb?: callback<watermarkOffsets>
  // ): any;

  on(event: "delivery-report", listener: (error: LibRdKafkaError, report: Events.DeliveryReportEvent) => void): this;
  on(event: "disconnected", listener: (info: Events.DisconnectedEvent) => void): this;
  on(event: "event", listener: (info: Events.EventEvent) => void): this;
  on(event: "event.error", listener: (info: Events.ErrorEvent) => void): this;
  on(event: "event.log", listener: (info: Events.LogEvent) => void): this;
  on(event: "event.stats", listener: (info: Events.StatisticsEvent) => void): this;
  on(event: "event.throttle", listener: (info: Events.ThrottleEvent) => void): this;
  on(event: "ready", listener: (info: Events.ReadyEvent, metadata: Metadata) => void): this;
}

export class KafkaConsumer extends Client {
  constructor(conf: GlobalConfig, topicConf: TopicConfig | undefined);

  assign(assignments: SpecifiesTopicPartitionOffset[]): KafkaConsumer;

  assignments(): TopicPartition[];

  commit(topicPartitionOffsets: TopicPartitionOffset | TopicPartitionOffset[] | null): KafkaConsumer;

  commitMessage(msg: TopicPartitionOffset): KafkaConsumer;

  commitMessageSync(msg: TopicPartitionOffset): KafkaConsumer;

  commitSync(topicPartitionOffsets: TopicPartitionOffset | TopicPartitionOffset[] | null): KafkaConsumer;

  committed(topicPartitions: TopicPartition[], timeout: number, cb: callback<TopicPartitionOffset[]>): KafkaConsumer;
  committed(timeout: number, cb: callback<TopicPartitionOffset[]>): KafkaConsumer;

  // consume(number: any, cb?: (error: Error | null, messages: KafkaMessage[]) => void): void;
  consume(maxMessageCount: number, cb?: callback<KafkaMessage[]>): void;

  static createReadStream(conf: GlobalConfig, topicConf: TopicConfig, streamOptions: StreamConfig): ConsumerStream;

  disconnect(cb?: callbackNoError<ClientMetrics>): Client;

  getWatermarkOffsets(topic: string, partition: number): watermarkOffsets;

  offsetsStore(topicPartitions: TopicPartitionOffset[]): void;

  pause(topicPartitions: TopicPartition[]): true | Error;

  position(topicPartitions: TopicPartition[]): TopicPartitionOffset[];

  resume(topicPartitions: TopicPartition[]): true | Error;

  // seek(toppar: any, timeout: any, cb: any): any;
  seek(topicPartitionOffset: TopicPartitionOffset, timeout: number | null, cb: callback<void>): KafkaConsumer;

  setDefaultConsumeTimeout(timeoutMs: number): void;

  subscribe(topics: string[]): KafkaConsumer;

  subscription(): string[];

  unassign(): KafkaConsumer;

  unsubscribe(): KafkaConsumer;
}

export class Producer extends Client {
  constructor(globalConf: GlobalConfig, topicConf: TopicConfig | undefined);

  static createWriteStream(conf: GlobalConfig, topicConf: TopicConfig, streamOptions: StreamConfig): ProducerStream;

  disconnect(timeout: number, cb: callback<ClientMetrics>): void;

  // flush(timeout?: number | null, cb?: (err: Error | null, _: never) => void): Producer;
  flush(timeout?: number | null, cb?: callbackError): Producer;

  poll(): Producer;

  produce(
    topic: string,
    partition: number | null,
    message: Buffer | null,
    //key?: number[] | string,
    key?: string,
    timestamp?: number,
    opaque?: any
  ): boolean | LibRdKafkaError;

  setPollInterval(interval: number): Producer;
}

export const CODES: {
  ERRORS: {
    ERR_BROKER_NOT_AVAILABLE: number;
    ERR_CLUSTER_AUTHORIZATION_FAILED: number;
    ERR_GROUP_AUTHORIZATION_FAILED: number;
    ERR_GROUP_COORDINATOR_NOT_AVAILABLE: number;
    ERR_GROUP_LOAD_IN_PROGRESS: number;
    ERR_ILLEGAL_GENERATION: number;
    ERR_INCONSISTENT_GROUP_PROTOCOL: number;
    ERR_INVALID_COMMIT_OFFSET_SIZE: number;
    ERR_INVALID_GROUP_ID: number;
    ERR_INVALID_MSG: number;
    ERR_INVALID_MSG_SIZE: number;
    ERR_INVALID_REQUIRED_ACKS: number;
    ERR_INVALID_SESSION_TIMEOUT: number;
    ERR_LEADER_NOT_AVAILABLE: number;
    ERR_MSG_SIZE_TOO_LARGE: number;
    ERR_NETWORK_EXCEPTION: number;
    ERR_NOT_COORDINATOR_FOR_GROUP: number;
    ERR_NOT_ENOUGH_REPLICAS: number;
    ERR_NOT_ENOUGH_REPLICAS_AFTER_APPEND: number;
    ERR_NOT_LEADER_FOR_PARTITION: number;
    ERR_NO_ERROR: number;
    ERR_OFFSET_METADATA_TOO_LARGE: number;
    ERR_OFFSET_OUT_OF_RANGE: number;
    ERR_REBALANCE_IN_PROGRESS: number;
    ERR_RECORD_LIST_TOO_LARGE: number;
    ERR_REPLICA_NOT_AVAILABLE: number;
    ERR_REQUEST_TIMED_OUT: number;
    ERR_STALE_CTRL_EPOCH: number;
    ERR_TOPIC_AUTHORIZATION_FAILED: number;
    ERR_TOPIC_EXCEPTION: number;
    ERR_UNKNOWN: number;
    ERR_UNKNOWN_MEMBER_ID: number;
    ERR_UNKNOWN_TOPIC_OR_PART: number;
    ERR__ALL_BROKERS_DOWN: number;
    ERR__ASSIGN_PARTITIONS: number;
    ERR__AUTHENTICATION: number;
    ERR__BAD_COMPRESSION: number;
    ERR__BAD_MSG: number;
    ERR__BEGIN: number;
    ERR__CONFLICT: number;
    ERR__CRIT_SYS_RESOURCE: number;
    ERR__DESTROY: number;
    ERR__END: number;
    ERR__EXISTING_SUBSCRIPTION: number;
    ERR__FAIL: number;
    ERR__FS: number;
    ERR__INVALID_ARG: number;
    ERR__IN_PROGRESS: number;
    ERR__ISR_INSUFF: number;
    ERR__MSG_TIMED_OUT: number;
    ERR__NODE_UPDATE: number;
    ERR__NOT_IMPLEMENTED: number;
    ERR__NO_OFFSET: number;
    ERR__OUTDATED: number;
    ERR__PARTITION_EOF: number;
    ERR__PREV_IN_PROGRESS: number;
    ERR__QUEUE_FULL: number;
    ERR__RESOLVE: number;
    ERR__REVOKE_PARTITIONS: number;
    ERR__SSL: number;
    ERR__STATE: number;
    ERR__TIMED_OUT: number;
    ERR__TIMED_OUT_QUEUE: number;
    ERR__TRANSPORT: number;
    ERR__UNKNOWN_GROUP: number;
    ERR__UNKNOWN_PARTITION: number;
    ERR__UNKNOWN_PROTOCOL: number;
    ERR__UNKNOWN_TOPIC: number;
    ERR__UNSUPPORTED_FEATURE: number;
    ERR__WAIT_CACHE: number;
    ERR__WAIT_COORD: number;
  };
};

export type KafkaErrorCode = {
  [P in keyof typeof CODES.ERRORS]: number;
}

export const features: string[];

export const librdkafkaVersion: string;

interface ProducerStream extends Writable {
  producer: Producer;
  connect(metadataOptions: MetadataOptions): void;
  close(cb?: callbackNoError<void>): void;

}

export interface ConsumerStream extends Readable {
  consumer: KafkaConsumer;

  connect(metadataOptions: MetadataOptions): void;
  close(cb?: callbackNoError<void>): void;
}

export interface ConsumerStreamMessage extends TopicPartitionOffset {

  value: Buffer;
  size: number;
  topic: string;
  offset: number;
  partition: number;
  key?: string;
  timestamp?: number;
}

export function createReadStream(conf: any, topicConf: any, streamOptions: any): ConsumerStream;

export function createWriteStream(conf: any, topicConf: any, streamOptions: any): ProducerStream;

declare interface EventCallbackRepositoryArityOne {
  // domain events
  'data': ConsumerStreamMessage,
  'rebalance': any,
  'error': any,

  // connectity events
  'end': any,
  'close': any,
  'disconnected': any,
  'ready': any,
  'exit': any,
  'unsubscribed': any, 'connection.failure': any,

  // event messages
  'event.error': any,
  'event.log': any,
  'event.throttle': any,
  'event.event': any,
}

declare interface EventCallbackRepositoryArityTwo {
  'delivery-report': [any, any]
}
